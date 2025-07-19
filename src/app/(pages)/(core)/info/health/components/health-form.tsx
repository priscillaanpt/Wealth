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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { benefitType, groupHospital, parseBenefit } from "./constant";
import type { HospitalType } from "~/server/api/types/health-type";
import { useEffect, type Dispatch, type SetStateAction } from "react";

export default function HealthForm({
  hospitals,
  onSelectHospital,
}: {
  onSelectHospital: Dispatch<SetStateAction<HospitalType>>;
  hospitals: HospitalType[];
}) {
  const form = useForm<z.infer<typeof healthSchema>>({
    resolver: zodResolver(healthSchema),
  });

  const selectedHospital = form.watch("rumahsakit");
  useEffect(() => {
    if (selectedHospital) {
      const hospital = hospitals.find(
        (hospital) => hospital.name === selectedHospital,
      );
      if (hospital) onSelectHospital(hospital);
    }
  }, [hospitals, onSelectHospital, selectedHospital]);

  const groupedHospital = groupHospital({ hospitals });

  const selectedBenefit = hospitals.find(
    (hospital) => hospital.name === selectedHospital,
  )?.benefit;

  return (
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
                        <SelectValue placeholder="Silahkan pilih rumah sakit..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(groupedHospital).map(
                        ([location, hospitalList]) => (
                          <SelectGroup key={location}>
                            <SelectLabel>
                              <span className="text-h5 text-blacknavy">
                                {location}
                              </span>
                            </SelectLabel>
                            {hospitalList.map((hospital) => (
                              <SelectItem
                                className="pl-4"
                                key={hospital.id}
                                value={hospital.name}
                              >
                                {hospital.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ),
                      )}
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
        {benefitType.map((benefit, idx) => (
          <div
            key={`Benefit-${idx + 1}`}
            className="flex flex-row items-center gap-2"
          >
            <Checkbox
              className="disabled:opacity-100"
              disabled
              checked={selectedBenefit?.includes(benefit)}
            />
            <p>{parseBenefit(benefit)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
