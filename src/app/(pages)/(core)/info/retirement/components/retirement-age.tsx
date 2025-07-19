"use client";
import RetirementAgeInput from "./retirement-age-input";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { retirementSchema } from "~/app/schemas/retirement-schema";

interface RetirementAgeProps {
  form: UseFormReturn<z.infer<typeof retirementSchema>>;
}
export default function RetirementAge({ form }: RetirementAgeProps) {
  const ageOld = form.watch("old");
  const ageYoung = form.watch("young");
  const yearsToRetire = ageOld - ageYoung;
  return (
    <div>
      <h1 className="text-h5 text-blacknavy font-rubik font-bold">
        RENCANA PENSIUN
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <RetirementAgeInput
          form={form}
          nameAge="young"
          nameIncome="youngIncome"
        />
        <RetirementAgeInput form={form} nameAge="old" nameIncome="oldIncome" />
        <RetirementAgeInput
          form={form}
          nameAge="death"
          nameIncome="deathIncome"
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <p className="text-b1 text-whitenavy font-rubik">
          Tahun hingga pensiun :
        </p>
        <p className="text-h2 text-blacknavy font-rubik">
          {yearsToRetire < 0
            ? "Input tidak Valid"
            : new Date().getFullYear() + yearsToRetire}
        </p>
      </div>
    </div>
  );
}
