import type { AccordionItemProps } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Table, TableBody } from "~/components/ui/table";
import type { Dispatch, SetStateAction } from "react";
import { formatToRupiah } from "~/lib/utils";
import AccordionInput from "./components/accordion-input";

interface FinanceAccordionProps<
  TFieldData extends Record<string, number>,
  TMonthData extends Record<string, number>,
> extends AccordionItemProps {
  label: string;
  fieldData: TFieldData;
  fieldMonth: TMonthData;
  onDataChange: Dispatch<SetStateAction<TFieldData>>;
  onMonthChange: Dispatch<SetStateAction<TMonthData>>;

  totalValuePerMonth: number;
}

export default function FinanceAccordion<
  TFieldData extends Record<string, number>,
  TMonthData extends Record<string, number>,
>(props: FinanceAccordionProps<TFieldData, TMonthData>) {
  const {
    label,
    fieldData,
    fieldMonth,
    onDataChange,
    onMonthChange,
    totalValuePerMonth,
    ...accProps
  } = props;
  function setIncomeProp<K extends keyof typeof fieldData>(
    key: K,
    value: (typeof fieldData)[K],
  ) {
    onDataChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function setMonthProp<K extends keyof typeof fieldMonth>(
    key: K,
    value: (typeof fieldMonth)[K],
  ) {
    onMonthChange((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <AccordionItem {...accProps} className="rounded-xl bg-white">
      <AccordionTrigger className="grid grid-cols-[16px_300px_1fr_1fr] gap-0 p-6">
        <p className="text-h5 text-blacknavy ml-4 flex flex-row">{label}</p>
        <p className="text-b1 text-blacknavy px-2 text-right text-sm">
          Rp {formatToRupiah(totalValuePerMonth.toFixed(2).toString())} / Bulan
        </p>
        <p className="text-b1 text-blacknavy px-2 text-right text-sm">
          Rp {formatToRupiah((totalValuePerMonth * 12).toFixed(2).toString())} /
          Tahun
        </p>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0 border-0 pb-2">
        <Table>
          <TableBody>
            {Object.keys(fieldData).map((keyVal, idx) => {
              return (
                <AccordionInput
                  name={keyVal}
                  key={idx}
                  dataValue={fieldData[keyVal]!}
                  monthValue={fieldMonth[keyVal + "Months"]!}
                  onDataChange={(val) =>
                    setIncomeProp(keyVal, val as TFieldData[string])
                  }
                  onMonthChange={(val) =>
                    setMonthProp(keyVal + "Months", val as TMonthData[string])
                  }
                />
              );
            })}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
}
