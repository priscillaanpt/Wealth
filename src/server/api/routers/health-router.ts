import {
  HealthQuerySchema,
  updateHospitalPrograms,
} from "../schemas/health-schema";
import {
  getHospitalProgram,
  getHospitals,
  updateHospitalProgram,
} from "../services/health-service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const healthRouter = createTRPCRouter({
  getHospitals: protectedProcedure.query(async ({ ctx }) => {
    return await getHospitals(ctx.db);
  }),
  getHospitalProgram: protectedProcedure
    .input(HealthQuerySchema)
    .query(async ({ ctx, input }) => {
      return await getHospitalProgram(
        ctx.db,
        input.hospitalId,
        ctx.session.user.id,
      );
    }),
  updateHospitalPrograms: protectedProcedure
    .input(updateHospitalPrograms)
    .mutation(async ({ ctx, input }) => {
      return updateHospitalProgram(
        ctx.db,
        input.HospitalId,
        input.program,
        ctx.session.user.id,
      );
    }),
});
