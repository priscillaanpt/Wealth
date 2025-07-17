import { Plus } from "lucide-react";
import { TableCell, TableRow } from "~/components/ui/table";

export default function FinanceAdd() {
  return (
    <TableRow className="flex h-14 items-center border-x-0 border-[#DAE0F2] px-6">
      <TableCell className="flex h-full w-[316px] items-center border-r-2 border-[#DAE0F2] p-0">
        <button>
          <Plus className="h-6 w-6 rounded-xl bg-[#F4F7FF] text-[#858EBD]" />
        </button>
      </TableCell>
    </TableRow>
  );
}
