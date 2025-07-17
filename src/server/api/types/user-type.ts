import type {
  PersonalInfo,
  PersonalIncome,
  PersonalExpense,
} from "@prisma/client";

export type UpdatePersonalInfoType = Partial<
  Omit<PersonalInfo, "id" | "status">
> & {
  userId: string;
  token?: string;
  name?: string;
  status?: "BELUM_MENIKAH" | "MENIKAH" | "CERAI";
};

export type UpdatePersonalIncomeType = Partial<Omit<PersonalIncome, "id">> & {
  userId: string;
};

export type UpdatePersonalExpenseType = Partial<Omit<PersonalExpense, "id">> & {
  userId: string;
};
