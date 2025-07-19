import type { Control, FieldArrayWithId } from "react-hook-form";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useWatch } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { formatToRupiah } from "~/lib/utils";

type EducationStage = {
  id: string;
  stageName: string;
  schoolType: "NEGERI" | "SWASTA";
  period: number;
  costBeforeInflation: number;
  inflationRate: number;
  childAge: number;
};

interface EducationStageTableProps {
  fields: FieldArrayWithId<
    {
      childName: string;
      birthDate: Date;
      fundAllocated: number;
      stages: EducationStage[];
    },
    "stages",
    "id"
  >[];
  control: Control<{
    stages: EducationStage[];
    childName: string;
    birthDate: Date;
    fundAllocated: number;
  }>;
}

const EducationStageTable = ({ fields, control }: EducationStageTableProps) => {
  const stages = useWatch({ control, name: "stages" });
  const totalChildCost = stages.reduce(
    (total, stage) =>
      total + stage.costBeforeInflation * (1 + stage.inflationRate / 100),
    0,
  );
  return (
    <>
      <Table className="border-b-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 border-2 text-left font-bold">
              PENDIDIKAN
            </TableHead>
            <TableHead className="w-1/6 border-y-2 border-r-2 text-right">
              Jenis Sekolah
            </TableHead>
            <TableHead className="w-1/12 border-y-2 border-r-2 text-center">
              Periode
            </TableHead>
            <TableHead className="w-1/5 border-y-2 border-r-2 text-right">
              Biaya
            </TableHead>
            <TableHead className="w-[10%] border-y-2 border-r-2 text-center">
              Inflasi <span className="text-gray-500">(%)</span>
            </TableHead>
            <TableHead className="border-y-2 border-r-2 text-right">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => {
            const cost = stages[index]?.costBeforeInflation ?? 0;
            const inflation = stages[index]?.inflationRate ?? 0;
            const total = cost * (1 + inflation / 100);

            return (
              <TableRow key={field.id}>
                <TableCell className="hidden">
                  <Checkbox id="terms-2" defaultChecked />
                  <FormField
                    control={control}
                    name={`stages.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="flex items-center border-x-2">
                  <Checkbox id="terms-2" defaultChecked />
                  <FormField
                    control={control}
                    name={`stages.${index}.stageName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-h3 m-0 w-auto border-0 px-2 shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="border-r-2">
                  <FormField
                    control={control}
                    name={`stages.${index}.schoolType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Jenis Sekolah" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="NEGERI">Negeri</SelectItem>
                              <SelectItem value="SWASTA">Swasta</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="border-r-2 hidden">
                  <FormField
                    control={control}
                    name={`stages.${index}.childAge`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="border-r-2">
                  <FormField
                    control={control}
                    name={`stages.${index}.period`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="m-0 w-auto border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="flex items-center border-r-2">
                  Rp
                  <FormField
                    control={control}
                    name={`stages.${index}.costBeforeInflation`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="m-0 w-auto border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="border-r-2">
                  <FormField
                    control={control}
                    name={`stages.${index}.inflationRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            className="m-0 w-auto border-0 px-2 text-right shadow-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="text-right">
                  Rp {formatToRupiah(total.toFixed(2).toString())}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-between px-3 pb-6">
        <h1 className="text-h5 text-blacknavy font-rubik font-bold">TOTAL</h1>
        <h1 className="text-h5 text-blacknavy font-rubik font-bold">
          Rp {formatToRupiah(totalChildCost.toFixed(2).toString())}
        </h1>
      </div>
    </>
  );
};

export default EducationStageTable;
