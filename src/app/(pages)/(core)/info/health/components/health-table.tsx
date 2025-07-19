import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { healthProgram } from "./constant";
import HealthProgram from "./health-program";
import type { HospitalType } from "~/server/api/types/health-type";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import type z from "zod";
import { programSchema } from "~/app/schemas/health-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FormEvent } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

interface healthTableProps {
  selectedHospital: HospitalType;
}

type ProgramSchema = z.infer<typeof programSchema>;
type ProgramTypeName = keyof ProgramSchema;

export default function HealthTable({ selectedHospital }: healthTableProps) {
  const { data: programs, refetch } = api.health.getHospitalProgram.useQuery({
    hospitalId: selectedHospital.id ?? "",
  });
  const updateHospitalProgram = api.health.updateHospitalPrograms.useMutation({
    onSuccess: () => {
      toast.success(`Success Update hospital : ${selectedHospital.name}`);
      void refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (programs) {
      form.reset(programs);
    }
  }, [programs, form, selectedHospital]);
  console.log("PROGRAMSSSS :", programs);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted value :", form.getValues());
    updateHospitalProgram.mutate({
      HospitalId: selectedHospital.id,
      program: form.getValues(),
    });
  }
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
      <Form {...form}>
        <form id="form" onSubmit={onSubmit}>
          <Table className="flex w-full flex-col">
            <TableHeader>
              <TableRow className="grid w-full grid-cols-[1fr_180px_180px_180px]">
                <TableHead className="justify-center border-r-1 border-r-[#DAE0F2]">
                  <span className="text-h5 text-blacknavy">PROGRAM</span>
                </TableHead>
                <TableHead className="text-b1 font-rubik flex items-center justify-center border-r-1 border-r-[#DAE0F2] text-[#5A607F]">
                  Kebutuhan
                </TableHead>
                <TableHead className="text-b1 font-rubik flex items-center justify-center border-r-1 border-r-[#DAE0F2] text-[#5A607F]">
                  Kepemilikan
                </TableHead>
                <TableHead className="text-b1 font-rubik flex items-center justify-center text-[#5A607F]">
                  Perbedaan
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthProgram.map((value, idx) => (
                <HealthProgram
                  type={value as ProgramTypeName}
                  key={`program-${idx + 1}`}
                  form={form}
                />
              ))}
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
}
