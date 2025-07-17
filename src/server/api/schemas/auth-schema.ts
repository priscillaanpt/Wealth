import { z } from "zod";

export const RegisterSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z.string().nonempty({
    message: "Password is required",
  }),
});

export const VerifyEmailSchema = z.object({
  token: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string(),
});

export const ChangePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export const ChangeEmailSchema = z.object({
  password: z.string(),
  newEmail: z.string(),
  redirectUrl: z.string(),
});

export const SendEmailTokenSchema = z.object({
  userId: z.string(),
  targetEmail: z.string(),
  type: z.enum(["PASSWORD_RESET", "EMAIL_VERIFICATION"]),
});
