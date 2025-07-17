import type { PrismaClient } from "@prisma/client";
import type {
  ChangeEmailType,
  ChangePasswordType,
  ForgotPasswordType,
  RegisterType,
  ResetPasswordType,
  SendEmailTokenType,
  VerifyEmailType,
} from "../types/auth-type";
import { sendEmail } from "~/server/lib/email";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import { createUser } from "./user-service";

const checkEmail = async (db: PrismaClient, email: string) => {
  const existing = await db.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      emailVerified: true,
    },
  });

  if (existing?.emailVerified) {
    throw new TRPCError({
      message: "Email already registered",
      code: "CONFLICT",
    });
  }
};

const checkPassword = async (inputPassword: string, password_hash: string) => {
  const passwordMatch = await bcrypt.compare(inputPassword, password_hash);

  if (!passwordMatch) {
    throw new TRPCError({
      message: "Password doesn't match",
      code: "BAD_REQUEST",
    });
  }
};

const addVerificationToken = async (
  db: PrismaClient,
  userId: string,
  tokenType: "EMAIL_VERIFICATION" | "PASSWORD_RESET",
) => {
  await db.verificationToken.deleteMany({
    where: {
      userId: userId,
      type: tokenType,
    },
  });

  const token = crypto.randomUUID();
  await db.verificationToken.create({
    data: {
      token,
      userId: userId,
      type: tokenType,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    },
  });

  return token;
};

export const sendVerificationToken = async (
  db: PrismaClient,
  input: SendEmailTokenType,
) => {
  const token = await db.verificationToken.findFirst({
    where: {
      userId: input.userId,
      type: input.type,
    },
  });

  const tokenInput = token
    ? token.token
    : await addVerificationToken(db, input.userId, input.type);
  let firstSend = true;
  // Exists token for verification
  if (token) {
    const FIVE_MINS_IN_MS = 30 * 1000;

    // If its 5 minutes later, resend the email
    if (new Date().getTime() - token.createdAt.getTime() >= FIVE_MINS_IN_MS) {
      firstSend = false;
    } else {
      // If its earlier / smaller than 5 minutes, give warning
      throw new TRPCError({
        message: `${input.type == "EMAIL_VERIFICATION" ? "Verification email" : "Reset password email"} has already been sent! Try again in a few minutes.`,
        code: "TOO_MANY_REQUESTS",
      });
    }
  }

  await sendEmail(
    input.targetEmail,
    tokenInput,
    input.type == "EMAIL_VERIFICATION",
    "/profile",
  );

  return {
    firstSend,
  };
};

export const register = async (db: PrismaClient, input: RegisterType) => {
  const userId = await createUser(db, input)

  const { firstSend } = await sendVerificationToken(db, {
    userId,
    targetEmail: input.email,
    type: "EMAIL_VERIFICATION",
  });

  return {
    firstSend,
    userId,
  };
};

/* Verify Email Flow
 ** 1. Check token exists and is it valid
 ** 2. Update verified
 ** 3. Delete token
 */
export const verifyEmail = async (
  db: PrismaClient,
  input: VerifyEmailType,
  userId?: string,
) => {
  const record = await db.verificationToken.findUnique({
    where: {
      token: input.token,
    },
  });

  // Token expired or doesnt match
  if (
    !record ||
    record.expires < new Date() ||
    record.type !== "EMAIL_VERIFICATION"
  ) {
    throw new TRPCError({
      message: "Invalid or expired token",
      code: "BAD_REQUEST",
    });
  }

  const dataInput: {
    emailVerified: Date;
    email?: string;
    newEmail?: null;
  } = {
    emailVerified: new Date(),
    email: undefined,
    newEmail: undefined,
  };

  const userEmail = await db.user.findFirst({
    select: {
      newEmail: true,
    },
    where: {
      id: record.userId,
    },
  });

  const isChangeEmail = !!userEmail?.newEmail;

  if (userEmail?.newEmail) {
    if (userId != record.userId) {
      throw new TRPCError({
        message: "You're not authorized to access this resource",
        code: "BAD_REQUEST",
      });
    }

    dataInput.email = userEmail.newEmail;
    dataInput.newEmail = null;
  }

  await db.user.update({
    where: {
      id: record.userId,
    },
    data: dataInput,
  });

  return {
    type: isChangeEmail ? "change" : "signup",
    email: userEmail?.newEmail
  };
};

/* Change Email Flow
 ** 1. Check user exists
 ** 2. Check password
 ** 3. Check existing email thats verified
 ** 4. Update new email with input
 ** 5. Send verification token
 */
export const changeEmail = async (
  db: PrismaClient,
  input: ChangeEmailType,
  userId: string,
) => {
  const user = await db.user.findFirst({
    select: {
      password_hash: true,
    },
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new TRPCError({ message: "User is not valid", code: "BAD_REQUEST" });
  }

  await checkPassword(input.password, user.password_hash ?? "");

  await checkEmail(db, input.newEmail);

  const { firstSend } = await sendVerificationToken(db, {
    userId,
    targetEmail: input.newEmail,
    type: "EMAIL_VERIFICATION",
  });

  if (firstSend) {
    await db.user.update({
      data: {
        newEmail: input.newEmail,
      },
      where: {
        id: userId,
      },
    });
  }

  return { firstSend };
};

export const forgotPassword = async (
  db: PrismaClient,
  input: ForgotPasswordType,
) => {
  const user = await db.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!user) return true;

  const { firstSend } = await sendVerificationToken(db, {
    userId: user.id,
    targetEmail: input.email,
    type: "PASSWORD_RESET",
  });
  return firstSend;
};

// From forget password
export const resetPassword = async (
  db: PrismaClient,
  input: ResetPasswordType,
) => {
  const record = await db.verificationToken.findUnique({
    where: {
      token: input.token,
    },
  });

  if (
    !record ||
    record.expires < new Date() ||
    record.type !== "PASSWORD_RESET"
  ) {
    throw new TRPCError({
      message: "Invalid or expired token",
      code: "BAD_REQUEST",
    });
  }

  const password_hash = await bcrypt.hash(input.newPassword, 10);
  await db.user.update({
    where: {
      id: record?.userId,
    },
    data: {
      password_hash,
    },
  });

  await db.verificationToken.delete({
    where: {
      token: input.token,
    },
  });
};

export const changePassword = async (
  db: PrismaClient,
  input: ChangePasswordType,
  userId?: string,
) => {
  if (!userId) {
    throw new TRPCError({
      message: "User Id is not provided",
      code: "BAD_REQUEST",
    });
  }

  const usersPw = await db.user.findFirst({
    select: {
      password_hash: true,
    },
    where: {
      id: userId,
    },
  });

  if (!usersPw) {
    throw new TRPCError({ message: "User is not valid", code: "BAD_REQUEST" });
  }

  if (!usersPw.password_hash) {
    throw new TRPCError({
      message: "User didnt create the account with credentials for this email!",
      code: "BAD_REQUEST",
    });
  }

  const passwordMatch = await bcrypt.compare(
    input.oldPassword,
    usersPw.password_hash,
  );

  if (!passwordMatch) {
    throw new TRPCError({
      message: "Old password doesn't match",
      code: "BAD_REQUEST",
    });
  }

  await db.user.update({
    data: {
      password_hash: await bcrypt.hash(input.newPassword, 10),
    },
    where: {
      id: userId,
    },
  });
};
