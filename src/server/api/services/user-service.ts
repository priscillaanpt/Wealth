import type { PrismaClient } from "@prisma/client";
import type { RegisterType } from "../types/auth-type";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";
import type {
  UpdatePersonalInfoType,
  UpdatePersonalIncomeType,
  UpdatePersonalExpenseType,
} from "../types/user-type";

export const createUser = async (db: PrismaClient, input: RegisterType) => {
  const existing = await db.user.findFirst({
    where: {
      email: input.email,
    },
    include: {
      accounts: true,
    },
  });

  if (existing?.emailVerified || (existing?.accounts.some.length ?? 0) > 0) {
    throw new TRPCError({
      message: "Email already registered",
      code: "CONFLICT",
    });
  }

  if (existing) {
    return existing.id;
  }

  const inputWithHash = {
    email: input.email,
    password_hash: await bcrypt.hash(input.password, 10),
  };

  const userId = (
    await db.user.create({
      data: inputWithHash,
    })
  ).id;

  await db.personalInfo.create({
    data: {
      userId,
    },
  });

  await db.personalIncome.create({
    data: {
      userId,
    },
  });

  await db.personalExpense.create({
    data: {
      userId,
    },
  });

  return userId;
};

export const getPersonalInfo = async (db: PrismaClient, userId: string) => {
  const personalInfo = await db.personalInfo.findUnique({
    where: {
      userId,
    },
    omit: {
      id: true,
      userId: true,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!personalInfo) {
    throw new TRPCError({
      message: "No user exists with that id",
      code: "BAD_REQUEST",
    });
  }

  const { user, ...restOfPersonalInfo } = personalInfo;
  const flattenedPersonalInfo = {
    ...restOfPersonalInfo,
    name: user.name,
  };

  return flattenedPersonalInfo;
};

export const getPersonalIncome = async (db: PrismaClient, userId: string) => {
  const personalIncome = await db.personalIncome.findUnique({
    where: {
      userId,
    },
    omit: {
      id: true,
      userId: true,
    },
  });

  if (!personalIncome) {
    throw new TRPCError({
      message: "No user exists with that id",
      code: "BAD_REQUEST",
    });
  }

  return personalIncome;
};

export const getPersonalExpense = async (db: PrismaClient, userId: string) => {
  const personalExpense = await db.personalExpense.findUnique({
    where: {
      userId,
    },
    omit: {
      id: true,
      userId: true,
    },
  });

  if (!personalExpense) {
    throw new TRPCError({
      message: "No user exists with that id",
      code: "BAD_REQUEST",
    });
  }

  return personalExpense;
};

export const updatePersonalInfo = async (
  db: PrismaClient,
  input: UpdatePersonalInfoType,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, name, token, ...personalData } = input;
  const existing = await db.user.findFirst({
    where: {
      id: input.userId,
    },
    select: {
      id: true,
    },
  });

  if (!existing) {
    throw new TRPCError({
      message: "User doesn't exist",
      code: "BAD_REQUEST",
    });
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });

  const personalInfo = await db.personalInfo.update({
    where: {
      userId,
    },
    data: personalData,
  });

  return personalInfo;
};

export const UpdatePersonalIncome = async (
  db: PrismaClient,
  input: UpdatePersonalIncomeType,
) => {
  const { userId, ...incomeData } = input;
  const existing = await db.user.findFirst({
    where: {
      id: input.userId,
    },
    select: {
      id: true,
    },
  });

  if (!existing) {
    throw new TRPCError({
      message: "User doesn't exist",
      code: "CONFLICT",
    });
  }

  const personalIncome = await db.personalIncome.update({
    where: {
      userId,
    },
    data: incomeData,
  });

  return personalIncome;
};

export const updatePersonalExpense = async (
  db: PrismaClient,
  input: UpdatePersonalExpenseType,
) => {
  const { userId, ...expenseData } = input;
  const existing = await db.user.findFirst({
    where: {
      id: input.userId,
    },
    select: {
      id: true,
    },
  });

  if (!existing) {
    throw new TRPCError({
      message: "User doesn't exist",
      code: "CONFLICT",
    });
  }

  const personalInfo = await db.personalExpense.update({
    where: {
      userId,
    },
    data: expenseData,
  });

  return personalInfo;
};
