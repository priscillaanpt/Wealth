import type { Decimal } from "@prisma/client/runtime/library";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface HealthTableProps {
  programs:
    | {
        name: string;
        need: number | Decimal;
        own: number | Decimal;
      }[]
    | undefined;
}

export default function HealthTable({ programs }: HealthTableProps) {
  const fieldList = [
    "Biaya Dokter dan obat-obatan",
    "Kamar dan Layanan",
    "Bedah dan Ruang Operasi",
    "Penyakit Serius",
    "Kompensasi Disabilitas",
    "Kompensasi Pendapatan Harian",
  ];
  console.log(programs);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-h5 bg-red text-blacknavy">
            PROGRAM
          </TableHead>
          <TableHead className="text-b1 font-normal text-[#5A607F]">
            Kebutuhan
          </TableHead>
          <TableHead className="text-b1 font-normal text-[#5A607F]">
            Kepemilikan
          </TableHead>
          <TableHead className="text-b1 font-normal text-[#5A607F]">
            Perbedaan
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fieldList.map((value, idx) => (
          <TableRow key={idx}>
            <TableCell className="text-blacknavy flex flex-row gap-2">
              <Checkbox
                checked={
                  programs &&
                  Boolean(programs.find((program) => program.name === value))
                }
              />
              {value}
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
