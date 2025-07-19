"use client";
import { Form } from "~/components/ui/form";
import RetirementAge from "./components/retirement-age";
import RetirementChart from "./components/retirement-chart";
import RetirementPlan from "./components/retirement-plan";
import { useForm } from "react-hook-form";
import type z from "zod";
import { retirementSchema } from "~/app/schemas/retirement-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import RetirementInflation from "./components/retirement-inflation";
import { calculateRetireFund } from "~/app/utils/calculator";
import { parseCurrency } from "~/app/utils/parse";

export default function Page() {
  const form = useForm<z.infer<typeof retirementSchema>>({
    resolver: zodResolver(retirementSchema),
    defaultValues: {
      death: 0,
      young: 0,
      old: 0,
      deathIncome: 0,
      inflationAfterRetire: 0,
      inflationBeforeRetire: 0,
      oldIncome: 0,
      youngIncome: 0,
      rate: 0.04,
      incomeGrowth: 0,
      investmentMonthly: 0,
    },
  });

  const totalFund = calculateRetireFund({
    ageDeath: Number(form.watch("death")),
    ageNow: Number(form.watch("young")),
    ageRetire: Number(form.watch("old")),
    inflationAfterRetire: Number(form.watch("inflationBeforeRetire")),
    inflationBeforeRetire: Number(form.watch("inflationAfterRetire")),
    interestRate: Number(form.watch("rate")),
    monthlyIncome: Number(form.watch("youngIncome")),
    incomeGrowth: Number(form.watch("incomeGrowth")),
    inheritance: Number(form.watch("deathIncome")),
    monthlyInvest: Number(form.watch("investmentMonthly")),
    saving: Number(form.watch("saving")),
  });

  console.log(
    parseCurrency(totalFund[1] ?? 0),
    parseCurrency(totalFund[0] ?? 0),
  );
  const retirementFund = Number(totalFund[0]) - Number(totalFund[1]);
  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl bg-white p-6">
            <RetirementAge form={form} />
            <RetirementInflation form={form} />
          </div>
          <div className="flex flex-row justify-between gap-4 rounded-xl bg-white p-6">
            <h1 className="text-blacknavy text-h5 font-rubik">
              ANDA AKAN MEMBUTUHKAN TABUNGAN PENSIUN SEBESAR
            </h1>
            <p className="text-blacknavy text-h5 font-rubik">
              {retirementFund > 0
                ? parseCurrency(retirementFund)
                : parseCurrency(0)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <RetirementPlan form={form} />
            <RetirementChart
              saving={Number(form.watch("saving"))}
              target={Number(totalFund[0])}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
