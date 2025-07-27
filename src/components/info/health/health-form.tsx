"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { healthSchema } from "~/app/schemas/info-schema";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import HealthTable from "./health-table";

export default function HealthForm() {
  const form = useForm<z.infer<typeof healthSchema>>({
    resolver: zodResolver(healthSchema),
  });

  const hospitals = api.health.getHospitals.useQuery();
  console.log("HOSPITAL DATA :", hospitals.data);
  const selectedHospital = hospitals.data?.find(
    (hospital) => hospital.name === form.watch("rumahsakit"),
  );
  const benefits = selectedHospital?.benefits;

  const programs = api.health.getHospitalPrograms.useQuery({
    hospitalId: selectedHospital?.id ?? "",
  }).data;
  console.log("PROGRAMSS :", programs);
  return (
    <>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
        <p className="text-h5 text-blacknavy">RENCANA KESEHATAN</p>
        <Form {...form}>
          <form className="my-2">
            <FormField
              control={form.control}
              name="rumahsakit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-b2 text-blacknavy font-normal">
                    Rumah Sakit
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hospitals.data?.map((hospital, id) => (
                          <SelectItem
                            key={`hospital-name-${id}`}
                            value={hospital.name}
                          >
                            {hospital.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <p className="text-h5 text-blacknavy">BENEFIT</p>

        <div className="text-blacknavy flex flex-row gap-8">
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              className="disabled:opacity-100"
              disabled
              checked={Boolean(
                benefits?.find((benefit) => benefit.type === "RAWAT_INAP"),
              )}
            />
            <p>Rawat Inap</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              className="disabled:opacity-100"
              disabled
              checked={Boolean(
                benefits?.find((benefit) => benefit.type === "RAWAT_JALAN"),
              )}
            />
            <p>Rawat Jalan</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              className="disabled:opacity-100"
              disabled
              checked={Boolean(
                benefits?.find((benefit) => benefit.type === "BERSALIN"),
              )}
            />
            <p>Bersalin</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              className="disabled:opacity-100"
              disabled
              checked={Boolean(
                benefits?.find((benefit) => benefit.type === "KESEHATAN_GIGI"),
              )}
            />
            <p>Kesehatan Gigi</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
        <HealthTable programs={programs} />
      </div>
    </>
  );
}
