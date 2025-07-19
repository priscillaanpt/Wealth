"use client";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import type z from "zod";
import type { programSchema } from "~/app/schemas/health-schema";
import type { ProgramTypeName } from "~/app/types/health-type";
import { parseCurrency } from "~/app/utils/parse";
import { Checkbox } from "~/components/ui/checkbox";
import { FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { TableCell, TableRow } from "~/components/ui/table";

interface healthProgramProps {
  type: ProgramTypeName;
  form: UseFormReturn<z.infer<typeof programSchema>>;
}

export default function HealthProgram({ type, form }: healthProgramProps) {
  const need = useWatch({ control: form.control, name: `${type}.need` }) ?? 0;
  const own = useWatch({ control: form.control, name: `${type}.own` }) ?? 0;
  const diff = need - own;
  return (
    <TableRow className="grid w-full grid-cols-[1fr_180px_180px_180px]">
      <TableCell className="text-blacknavy flex flex-row items-center gap-2 border-r-1 border-r-[#DAE0F2]">
        <FormField
          control={form.control}
          name={`${type}.isChecked`}
          render={({ field }) => (
            <>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
              {type}
            </>
          )}
        />
      </TableCell>

      <TableCell className="border-r-1 border-r-[#DAE0F2]">
        <FormField
          control={form.control}
          name={`${type}.need`}
          render={({ field }) => (
            <Input
              value={parseCurrency(field.value ?? 0)}
              onChange={(e) => {
                const clean = e.target.value
                  .replace(/\D/g, "")
                  .replace(/^0+(?=\d)/, "");
                field.onChange(Number(clean));
              }}
              inputMode="numeric"
              className="no-spinner text-b1 m-0 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
            />
          )}
        />
      </TableCell>

      <TableCell className="border-r-1 border-r-[#DAE0F2]">
        <FormField
          control={form.control}
          name={`${type}.own`}
          render={({ field }) => (
            <Input
              value={parseCurrency(field.value ?? 0)}
              onChange={(e) => {
                const clean = e.target.value
                  .replace(/\D/g, "")
                  .replace(/^0+(?=\d)/, "");
                field.onChange(Number(clean));
              }}
              inputMode="numeric"
              className="no-spinner text-b1 m-0 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
            />
          )}
        />
      </TableCell>

      <TableCell>
        <span className="flex h-full w-full items-center justify-end">
          {parseCurrency(diff > 0 ? diff : 0)}
        </span>
      </TableCell>
    </TableRow>
  );
}
