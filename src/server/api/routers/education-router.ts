import { TRPCError } from "@trpc/server";
import { addChildEducationPlan, AddChildEducationPlanSchema, ChildInfoSchema, getChildEducationPlan, getChildEducationPlanIdList, updateChildEducationPlan, UpdateChildEducationPlanSchema } from "../services/education-service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const educationRouter = createTRPCRouter({
  getChildEducationPlan: protectedProcedure
    .input(ChildInfoSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new TRPCError({
          message: "User id undefined!",
          code: "BAD_REQUEST",
        });
      }
      const inputWithId = { ...input, userId };
      return await getChildEducationPlan(
        ctx.db,
        inputWithId,
      );
    }),

  getChildEducationPlanIdList: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({
        message: "User id undefined!",
        code: "BAD_REQUEST",
      });
    }

    return await getChildEducationPlanIdList(ctx.db, { userId })
  }),

  addChildEducationPlan: protectedProcedure.input(AddChildEducationPlanSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({
        message: "User id undefined!",
        code: "BAD_REQUEST",
      });
    }

    const inputWithId = { ...input, parentId: userId };

    return await addChildEducationPlan(ctx.db, inputWithId)
  }),

  updateChildEducationPlan: protectedProcedure.input(UpdateChildEducationPlanSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    if (!userId) {
      throw new TRPCError({
        message: "User id undefined!",
        code: "BAD_REQUEST",
      });
    }

    const inputWithId = { ...input, parentId: userId };

    return await updateChildEducationPlan(ctx.db, inputWithId)
  })
});
