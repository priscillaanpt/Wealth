"use client";

import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TableCell, TableRow } from "~/components/ui/table";

function camelCaseToWords(input: string): string {
  return input
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

interface AccordionInputProps {
  name: string;
  dataValue: number;
  monthValue: number;
  onDataChange: (val: number) => void;
  onMonthChange: (val: number) => void;
}

export default function AccordionInput({
  name,
  dataValue,
  monthValue,
  onDataChange,
  onMonthChange,
}: AccordionInputProps) {
  return (
    <TableRow className="grid h-14 grid-cols-[316px_1fr_1fr] gap-0 border-x-0 px-6">
      <TableCell className="text-b1 ml-0 flex items-center border-r-2 border-[#DAE0F2] p-0">
        {camelCaseToWords(name)}
      </TableCell>
      <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 pr-2">
        <p>
          Rp
        </p>
        <Input
          type="text"
          inputMode="numeric"
          value={dataValue}
          onChange={(e) => onDataChange(Number(e.target.value))}
          className="no-spinner w-auto text-b1 m-0 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
        />
      </TableCell>
      <TableCell className="m-0 flex items-center p-0 border-r-2 border-[#DAE0F2]">
        <Select
          value={monthValue.toString()}
          onValueChange={(e) => {
            onMonthChange(Number(e))}
          }
        >
          <SelectTrigger className="w-3/4 mx-auto">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">Year</SelectItem>
            <SelectItem value="1">Month</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}
