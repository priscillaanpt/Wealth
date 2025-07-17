import z from "zod";

export const UpdateBasicInfoSchema = z.object({
  name: z.string().nonempty(),
  job: z.string().nonempty({ message: "Job is required!" }),
  company: z.string().nonempty({ message: "Company Name is required!" }),
  country: z.string().nonempty({ message: "Country is required!" }),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Must be exactly 5 digits",
  }),
  city: z.string().nonempty({ message: "City is required!" }),
  token: z.string().nonempty(),
});

export const UpdatePersonalInfoSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  job: z.string(),
  company: z.string(),
  country: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, {
    message: "Must be exactly 5 digits",
  }),
  city: z.string(),
  addressLine: z.string(),
  phoneNumber: z.string().regex(/^[0-9]+$/),
  birthDate: z.date(),
  status: z.enum(["BELUM_MENIKAH", "MENIKAH", "CERAI"]),
});

export const UpdatePersonalIncomeSchema = z.object({
  salary: z.number(),
  bonus: z.number(),
  commission: z.number(),
  interestIncome: z.number(),
  dividends: z.number(),
  otherIncome: z.number(),
  salaryMonths: z.number(),
  bonusMonths: z.number(),
  commissionMonths: z.number(),
  interestIncomeMonths: z.number(),
  dividendsMonths: z.number(),
  otherIncomeMonths: z.number(),
});

export const UpdatePersonalExpenseSchema = z.object({
  mortgage: z.number(),
  property: z.number(),
  electricity: z.number(),
  waterSewerTrash: z.number(),
  transport: z.number(),
  phone: z.number(),
  internet: z.number(),
  home: z.number(),
  personal: z.number(),
  insurance: z.number(),
  entertainment: z.number(),
  subscriptions: z.number(),
  investment: z.number(),

  mortgageMonths: z.number(),
  propertyMonths: z.number(),
  electricityMonths: z.number(),
  waterSewerTrashMonths: z.number(),
  transportMonths: z.number(),
  phoneMonths: z.number(),
  internetMonths: z.number(),
  homeMonths: z.number(),
  personalMonths: z.number(),
  insuranceMonths: z.number(),
  entertainmentMonths: z.number(),
  subscriptionsMonths: z.number(),
  investmentMonths: z.number(),
});