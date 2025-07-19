"use client";
import { Input } from "~/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { retirementSchema } from "~/app/schemas/retirement-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { parseCurrency } from "~/app/utils/parse";

interface RetirementPlanProps {
  form: UseFormReturn<z.infer<typeof retirementSchema>>;
}
export default function RetirementPlan({ form }: RetirementPlanProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
      <h1 className="text-h5 text-blacknavy font-rubik font-bold">
        RENCANA INVESTASI
      </h1>
      <FormField
        control={form.control}
        name="saving"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Saat ini kakak sedang menabung untuk masa pensiun
            </FormLabel>
            <FormControl>
              <Input
                value={parseCurrency(field.value ?? 0)}
                onChange={(e) => {
                  const clean = e.target.value
                    .replace(/\D/g, "")
                    .replace(/^0+(?=\d)/, "");
                  field.onChange(Number(clean));
                }}
                className="no-spinner"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="investmentMonthly"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Investasi bulanan</FormLabel>
            <FormControl>
              <Input
                value={parseCurrency(field.value ?? 0)}
                onChange={(e) => {
                  const clean = e.target.value
                    .replace(/\D/g, "")
                    .replace(/^0+(?=\d)/, "");
                  field.onChange(Number(clean));
                }}
                className="no-spinner"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="incomeGrowth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Peningkatan pendapatan yang diharapkan</FormLabel>
            <FormControl>
              <Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                type="number"
                className="no-spinner"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Suku bunga yang diharapkan</FormLabel>
            <FormControl>
              <Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                type="number"
                className="no-spinner"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
