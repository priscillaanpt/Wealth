"use client";
import { Input } from "~/components/ui/input";
import useRetirementPlan from "../useRetirementPlan";

export default function RetirementPlan() {
  const { investmentPlan, handleInvestmentPlan } = useRetirementPlan();
  console.log(investmentPlan);
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
      <h1 className="text-h5 text-blacknavy font-rubik font-bold">
        RENCANA INVESTASI
      </h1>
      <div>
        <p>Tabungan saat ini</p>
        <Input
          value={investmentPlan.currentSave}
          onChange={(e) =>
            handleInvestmentPlan("Current Save", Number(e.target.value))
          }
          type="number"
          className="no-spinner rounded-[4px] border-1 border-[#DAE0F2] bg-white pr-8"
        />
      </div>
      <div>
        <p>Investasi bulanan</p>
        <Input
          value={investmentPlan.monthlySave}
          onChange={(e) =>
            handleInvestmentPlan("Monthly Save", Number(e.target.value))
          }
          type="number"
          className="no-spinner rounded-[4px] border-1 border-[#DAE0F2] bg-white pr-8"
        />
      </div>
      <div>
        <p>Peningkatan pendapatan</p>
        <Input
          value={investmentPlan.incomeGrowth}
          onChange={(e) =>
            handleInvestmentPlan("Income Growth", Number(e.target.value))
          }
          type="number"
          className="no-spinner rounded-[4px] border-1 border-[#DAE0F2] bg-white pr-8"
        />
      </div>
      <div>
        <p>Suku bunga</p>
        <Input
          value={investmentPlan.rateGrowth}
          onChange={(e) =>
            handleInvestmentPlan("Rate Growth", Number(e.target.value))
          }
          type="number"
          className="no-spinner rounded-[4px] border-1 border-[#DAE0F2] bg-white pr-8"
        />
      </div>
    </div>
  );
}
