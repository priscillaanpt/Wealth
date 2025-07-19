import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { retirementSchema } from "~/app/schemas/retirement-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface RetirementInflationProps {
  form: UseFormReturn<z.infer<typeof retirementSchema>>;
}

export default function RetirementInflation({
  form,
}: RetirementInflationProps) {
  return (
    <div>
      <h1 className="text-blacknavy text-h3 font-rubik">
        Tingkat Inflasi untuk Biaya
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="inflationBeforeRetire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tingkat inflasi sebelum pensiun</FormLabel>
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
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="inflationAfterRetire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tingkat inflasi setelah pensiun</FormLabel>
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
      </div>
    </div>
  );
}
