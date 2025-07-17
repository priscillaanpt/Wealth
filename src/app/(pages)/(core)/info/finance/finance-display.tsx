import type { AccordionItemProps } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { formatToRupiah } from "~/lib/utils";

interface FinanceDisplayProps extends AccordionItemProps {
  label: string;
  incomePerMonth: number;
  expensePerMonth: number;
}

export default function FinanceDisplay(props: FinanceDisplayProps) {
  const {
    label,
    incomePerMonth,
    expensePerMonth,
    ...accProps
  } = props;
  return (
    <AccordionItem {...accProps} className="rounded-xl bg-white">
      <AccordionTrigger className="grid grid-cols-[16px_300px_1fr_1fr] gap-0 p-6">
        <p className="text-h5 text-blacknavy ml-4 flex flex-row">{label}</p>
        <p className="text-b1 text-blacknavy px-2 text-right text-sm">Bulanan</p>
        <p className="text-b1 text-blacknavy px-2 text-right text-sm">Tahunan</p>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-0 border-0 pb-2">
        <Table>
          <TableBody>
            <TableRow className="grid h-14 grid-cols-[316px_1fr_1fr] gap-0 border-x-0 px-6">
              <TableCell className="text-b1 ml-0 flex items-center border-r-2 border-[#DAE0F2] p-0">
                Total Pendapatan
              </TableCell>
              <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 pr-2">
                Rp
                <p className="no-spinner text-b1 m-0 w-1/2 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0">
                  {formatToRupiah(incomePerMonth.toFixed(2))}
                </p>
              </TableCell>
              <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 pr-2">
                Rp
                <p className="no-spinner text-b1 m-0 w-1/2 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0">
                  {formatToRupiah((incomePerMonth * 12).toFixed(2))}
                </p>
              </TableCell>
            </TableRow>
            <TableRow className="grid h-14 grid-cols-[316px_1fr_1fr] gap-0 border-x-0 px-6">
              <TableCell className="text-b1 ml-0 flex items-center border-r-2 border-[#DAE0F2] p-0">
                Total Biaya
              </TableCell>
              <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 pr-2">
                Rp
                <p className="no-spinner text-b1 m-0 w-1/2 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0">
                  {formatToRupiah(expensePerMonth.toFixed(2))}
                </p>
              </TableCell>
              <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 pr-2">
                Rp
                <p className="no-spinner text-b1 m-0 w-1/2 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0">
                  {formatToRupiah((expensePerMonth * 12).toFixed(2))}
                </p>
              </TableCell>
            </TableRow>
            <TableRow className="grid h-14 grid-cols-[316px_1fr_1fr] gap-0 border-x-0 px-6">
              <TableCell className="text-b1 ml-0 flex items-center border-r-2 border-[#DAE0F2] p-0">
                NET
              </TableCell>
              <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 font-bold text-green-500 pr-2">
                Rp
                <p className="font-bold no-spinner text-b1 m-0 w-1/2 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0">
                  {formatToRupiah((incomePerMonth - expensePerMonth).toFixed(2))}
                </p>
              </TableCell>
              <TableCell className="m-0 flex items-center justify-end border-r-2 border-[#DAE0F2] p-0 font-bold text-green-500 pr-2">
                Rp
                <p className="font-bold no-spinner text-b1 m-0 w-1/2 border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0">
                  {formatToRupiah(((incomePerMonth - expensePerMonth) * 12).toFixed(2))}
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
}
