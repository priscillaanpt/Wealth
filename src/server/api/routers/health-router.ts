import { HealthQuerySchema } from "../schemas/health-schema";
import { getHospitalPrograms, getHospitals } from "../services/health-service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const healthRouter = createTRPCRouter({
  getHospitals: protectedProcedure.query(async ({ ctx }) => {
    return await getHospitals(ctx.db);
  }),
  getHospitalPrograms: protectedProcedure
    .input(HealthQuerySchema)
    .query(async ({ ctx, input }) => {
      return await getHospitalPrograms(
        ctx.db,
        input.hospitalId,
        ctx.session.user.id,
      );
    }),
});
