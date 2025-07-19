"use client";
import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { retirementSchema } from "~/app/schemas/retirement-schema";
import { parseCurrency } from "~/app/utils/parse";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface RetirementAgeInputProps {
  form: UseFormReturn<z.infer<typeof retirementSchema>>;
  nameAge: keyof z.infer<typeof retirementSchema>;
  nameIncome: keyof z.infer<typeof retirementSchema>;
}

export default function RetirementAgeInput({
  form,
  nameAge,
  nameIncome,
}: RetirementAgeInputProps) {
  return (
    <div className="flex flex-col gap-4 bg-[#F5F5FA] p-4">
      <FormField
        control={form.control}
        name={nameAge}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <Image
              src={"/images/info/young.png"}
              alt="Young Icon"
              width={64}
              height={64}
              className="h-16 w-16"
            />

            <div className="flex flex-col gap-2">
              <FormLabel>Usia saat ini</FormLabel>
              <FormControl>
                <Input
                  value={field.value ?? 0}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  type="number"
                  className="no-spinner text-blacknavy font-rubik !text-h2 w-20 rounded-[4px] border-1 border-[#DAE0F2] bg-white text-center"
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={nameIncome}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pendapatan Bulanan (PV)</FormLabel>
            <FormControl>
              <Input
                value={parseCurrency(field.value ?? 0)}
                onChange={(e) => {
                  const clean = e.target.value
                    .replace(/\D/g, "")
                    .replace(/^0+(?=\d)/, "");
                  field.onChange(Number(clean));
                }}
                className="no-spinner text-blacknavy font-rubik w-full rounded-[4px] border-1 border-[#DAE0F2] bg-white text-center"
              />
            </FormControl>
            <p className="text-b1 text-black">
              {parseCurrency((field.value ?? 0) * 12)} / tahun
            </p>
          </FormItem>
        )}
      />
    </div>
  );
}
