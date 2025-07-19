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

export const retirementSchema = z.object({
  young: z.number().nonnegative(),
  youngIncome: z.number().nonnegative(),
  old: z.number().nonnegative(),
  oldIncome: z.number().nonnegative(),
  death: z.number().nonnegative(),
  deathIncome: z.number().nonnegative(),
  inflationBeforeRetire: z.number().nonnegative(),
  inflationAfterRetire: z.number().nonnegative(),

  saving: z.number().nonnegative(),
  investmentMonthly: z.number().nonnegative(),
  incomeGrowth: z.number().nonnegative(),
  rate: z.number().nonnegative(),
});
