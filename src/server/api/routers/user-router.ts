import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  UpdateBasicInfoSchema,
  UpdatePersonalExpenseSchema,
  UpdatePersonalIncomeSchema,
  UpdatePersonalInfoSchema,
} from "../schemas/user-schema";
import { getPersonalExpense, getPersonalIncome, getPersonalInfo, updatePersonalExpense, UpdatePersonalIncome, updatePersonalInfo } from "../services/user-service";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  updateBasicInfo: publicProcedure
    .input(UpdateBasicInfoSchema)
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.db.verificationToken.findUnique({
        where: {
          token: input.token,
        },
        select: {
          user: {
            select: {
              id: true,
              emailVerified: true,
            },
          },
        },
      });

      if (!record?.user?.emailVerified) {
        throw new TRPCError({
          message: "User hasn't been verified!",
          code: "BAD_REQUEST",
        });
      }

      return await updatePersonalInfo(ctx.db, {
        userId: record.user.id,
        ...input,
      });
    }),

  updatePersonalInfo: protectedProcedure
    .input(UpdatePersonalInfoSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          message: "User id undefined!",
          code: "BAD_REQUEST",
        });
      }
      const inputWithId = { ...input, userId };
      return await updatePersonalInfo(ctx.db, inputWithId);
    }),

  getPersonalInfo: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({
        message: "User id undefined!",
        code: "BAD_REQUEST",
      });
    }
    return await getPersonalInfo(ctx.db, userId);
  }),

  getPersonalIncome: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({
        message: "User id undefined!",
        code: "BAD_REQUEST",
      });
    }
    return await getPersonalIncome(ctx.db, userId);
  }),

  getPersonalExpense: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({
        message: "User id undefined!",
        code: "BAD_REQUEST",
      });
    }
    return await getPersonalExpense(ctx.db, userId);
  }),
  
  updatePersonalncome: protectedProcedure
    .input(UpdatePersonalIncomeSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          message: "User id undefined!",
          code: "BAD_REQUEST",
        });
      }
      const inputWithId = { ...input, userId };
      return await UpdatePersonalIncome(ctx.db, inputWithId);
    }),

  updatePersonalExpense: protectedProcedure
    .input(UpdatePersonalExpenseSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          message: "User id undefined!",
          code: "BAD_REQUEST",
        });
      }
      const inputWithId = { ...input, userId };
      return await updatePersonalExpense(ctx.db, inputWithId);
    }),
});
