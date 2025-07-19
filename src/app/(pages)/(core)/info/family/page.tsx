"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { familySchema } from "~/app/schemas/family-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { parseCurrency } from "~/app/utils/parse";
import { calculateFamilyFund } from "~/app/utils/calculator";

export default function Page() {
  const [familyFunds, setFamilyFunds] = useState(0);
  const form = useForm<z.infer<typeof familySchema>>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      "Biaya rumah tangga": 0,
      "Utang yang belum dibayar": 0,
      "Pendapatan tahunan anda": 0,
      "Berapa tahun pendapatan harus diberikan ?": 0,
      "Tabungan dan investasi anda saat ini ?": 0,
      "Tabungan pensiun Anda saat ini": 0,
      "Nilai asuransi jiwa yang berlaku pada hidup anda": 0,
      "Tingkat inflasi": 0,
      "Pendapatan tahunan pasangan Anda": 0,
      "Berapa lama pasangan Anda berharap untuk bekerja?": 0,
    },
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const total = calculateFamilyFund({
      yearsToProvide: Number(
        form.getValues()["Berapa tahun pendapatan harus diberikan ?"],
      ),
      yearsToWork: Number(
        form.getValues()["Berapa lama pasangan Anda berharap untuk bekerja?"],
      ),
      incomeYearly: Number(form.getValues()["Pendapatan tahunan anda"]),
      incomeSpouseYearly: Number(
        form.getValues()["Pendapatan tahunan pasangan Anda"],
      ),
      costHome: Number(form.getValues()["Biaya rumah tangga"]),
      debt: Number(form.getValues()["Utang yang belum dibayar"]),
      saving: Number(
        form.getValues()["Tabungan dan investasi anda saat ini ?"],
      ),
      retireFund: Number(form.getValues()["Tabungan pensiun Anda saat ini"]),
      inflation: Number(form.getValues()["Tingkat inflasi"]),
      lifeInsurance: Number(
        form.getValues()["Nilai asuransi jiwa yang berlaku pada hidup anda"],
      ),
    });

    console.log("Submitted value:", form.getValues());
    console.log("TOTALALAALLALAL :", total);
    setFamilyFunds(total);
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 rounded-xl bg-white p-6">
        <h1 className="text-h5 text-blacknavy">
          KEBUTUHAN ANDA AKAN ASURANSI JIWA
        </h1>
        <h1 className="text-h5 text-blacknavy">{parseCurrency(familyFunds)}</h1>
      </div>

      <Form {...form}>
        <form id="form" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
            <div className="felx-row flex w-[447px] items-center gap-4">
              <Image
                src={"/images/info/house.png"}
                alt="House Icon"
                width={64}
                height={64}
                className="h-16 w-16"
              />
              <h1 className="text-h5 text-blacknavy">
                PERKIRAAN PENGELUARAN KELUARGA ANDA JIKA ANDA MENINGGAL DUNIA :
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name={"Biaya rumah tangga"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        inputMode="numeric"
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Utang yang belum dibayar"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value ?? 0)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Pendapatan tahunan anda"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value ?? 0)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Berapa tahun pendapatan harus diberikan ?"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        type="number"
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Tabungan dan investasi anda saat ini ?"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value ?? 0)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Tabungan pensiun Anda saat ini"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value ?? 0)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Nilai asuransi jiwa yang berlaku pada hidup anda"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value ?? 0)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"Tingkat inflasi"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
            <div className="felx-row flex w-[447px] items-center gap-4">
              <Image
                src={"/images/info/spouse.png"}
                alt="Spouse Icon"
                width={64}
                height={64}
                className="h-16 w-16"
              />
              <h1 className="text-h5 text-blacknavy">
                DENGAN ASUMSI PASANGAN ANDA AKAN BEKERJA SETELAH KEMATIAN ANDA
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <FormField
                name="Pendapatan tahunan pasangan Anda"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={parseCurrency(field.value)}
                        onChange={(e) => {
                          const clean = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^0+(?=\d)/, "");
                          field.onChange(Number(clean));
                        }}
                        inputMode="numeric"
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="Berapa lama pasangan Anda berharap untuk bekerja?"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        inputMode="numeric"
                        className="no-spinner"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
