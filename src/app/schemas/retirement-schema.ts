import z from "zod";

export const retirementAgeSchema = z.object({
  young: z.number(),
  youngIncome: z.number(),
  old: z.number(),
  oldIncome: z.number(),
  death: z.number(),
  inheritance: z.number(),
  inflationBeforeRetire: z.number(),
  inflationAfterRetire: z.number(),
});
