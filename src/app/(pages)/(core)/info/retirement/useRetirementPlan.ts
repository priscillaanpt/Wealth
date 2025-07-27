import { useState } from "react";
import type { RetireFundType } from "~/app/utils/calculator";

const useRetirementPlan = () => {
  const [age, setAge] = useState({
    young: "0",
    old: "0",
    death: "0",
  });
  const [income, setIncome] = useState({
    young: "0",
    old: "0",
    death: "0",
  });
  const [rateBeforeRetire, setRateBeforeRetire] = useState(0);
  const [rateAfterRetire, setRateAfterRetire] = useState(0);
  const [investmentPlan, setInvestmentPlan] = useState({
    currentSave: 0,
    monthlySave: 0,
    incomeGrowth: 0,
    rateGrowth: 0,
  });

  function handleChangeAge(type: "young" | "old" | "death", value: string) {
    value = value.replace(/^0+(?=\d)/, "").replace(/\D/g, "");
    if (type === "young") {
      setAge((prevAge) => ({
        ...prevAge,
        young: value,
      }));
    } else if (type === "old") {
      setAge((prevAge) => ({
        ...prevAge,
        old: value,
      }));
    } else {
      setAge((prevAge) => ({
        ...prevAge,
        death: value,
      }));
    }
  }

  function handleChangeIncome(type: "young" | "old" | "death", value: string) {
    value = value.replace(/^0+(?=\d)/, "").replace(/\D/g, "");

    if (type === "young") {
      setIncome((prevIncome) => ({
        ...prevIncome,
        young: value,
      }));
    } else if (type === "old") {
      setIncome((prevIncome) => ({
        ...prevIncome,
        old: value,
      }));
    } else if (type === "death") {
      setIncome((prevIncome) => ({
        ...prevIncome,
        death: value,
      }));
    }
  }

  function isValidRetireFund({
    ageDeath,
    ageRetire,
    rateAfterRetire,
  }: RetireFundType) {
    if (ageDeath < ageRetire) {
      return false;
    }

    if (rateAfterRetire < 0) {
      return false;
    }

    return true;
  }

  function handleInvestmentPlan(
    type: "Current Save" | "Monthly Save" | "Income Growth" | "Rate Growth",
    value: number,
  ) {
    if (type === "Current Save") {
      setInvestmentPlan((prevState) => ({
        ...prevState,
        currentSave: value,
      }));
    } else if (type === "Monthly Save") {
      setInvestmentPlan((prevState) => ({
        ...prevState,
        monthlySave: value,
      }));
    } else if (type === "Income Growth") {
      setInvestmentPlan((prevState) => ({
        ...prevState,
        incomeGrowth: value,
      }));
    } else if (type === "Rate Growth") {
      setInvestmentPlan((prevState) => ({
        ...prevState,
        rateGrowth: value,
      }));
    }
  }

  return {
    age,
    income,
    rateBeforeRetire,
    rateAfterRetire,
    investmentPlan,
    handleChangeAge,
    handleChangeIncome,
    setRateBeforeRetire,
    setRateAfterRetire,
    isValidRetireFund,
    handleInvestmentPlan,
  };
};

export default useRetirementPlan;
