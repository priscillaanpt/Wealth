import { createTRPCRouter } from "~/server/api/trpc";
import { createRoleProtectedProcedure } from "~/server/middleware/trpc-rbac";
import {
  changeEmail,
  changePassword,
  forgotPassword,
  register,
  resetPassword,
  sendVerificationToken,
  verifyEmail,
} from "../services/auth-service";
import {
  ChangeEmailSchema,
  ChangePasswordSchema,
  ForgotPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SendEmailTokenSchema,
  VerifyEmailSchema,
} from "../schemas/auth-schema";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: createRoleProtectedProcedure(["unauth"])
    .input(RegisterSchema)
    .mutation(async ({ ctx, input }) => {
      return await register(ctx.db, input);
    }),

  sendEmail: createRoleProtectedProcedure(["unauth"])
    .input(SendEmailTokenSchema)
    .mutation(async ({ ctx, input }) => {
      return await sendVerificationToken(ctx.db, input);
    }),

  verifyEmail: createRoleProtectedProcedure(["auth", "unauth"])
    .input(VerifyEmailSchema)
    .mutation(async ({ ctx, input }) => {
      return verifyEmail(ctx.db, input, ctx.session?.user.id);
    }),

  forgotPassword: createRoleProtectedProcedure(["unauth"])
    .input(ForgotPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      return forgotPassword(ctx.db, input);
    }),

  resetPassword: createRoleProtectedProcedure(["unauth"])
    .input(ResetPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      return resetPassword(ctx.db, input);
    }),

  changePassword: createRoleProtectedProcedure(["auth"])
    .input(ChangePasswordSchema)
    .mutation(async ({ ctx, input }) => {
      return changePassword(ctx.db, input, ctx.session?.user.id);
    }),

  changeEmail: createRoleProtectedProcedure(["auth"])
    .input(ChangeEmailSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session?.user.id == undefined) {
        throw new TRPCError({
          message: "User isn't authenticated",
          code: "BAD_REQUEST",
        });
      }
      return changeEmail(ctx.db, input, ctx.session.user.id);
    }),
});
