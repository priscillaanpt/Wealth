export interface RetireFundType {
  targetRetireMonthlyIncome: number;
  rateAfterRetire: number;
  ageRetire: number;
  ageDeath: number;
}

interface RetireFundsType {
  ageRetire: number;
  ageNow: number;
  ageDeath: number;
  monthlyIncome: number;
  inflationBeforeRetire: number;
  inflationAfterRetire: number;
  interestRate: number;
  saving: number;
  monthlyInvest: number;
  incomeGrowth: number;
  inheritance: number;
}

export function calculateRetireFund({
  ageRetire,
  ageNow,
  ageDeath,
  monthlyIncome,
  inflationBeforeRetire,
  inflationAfterRetire,
  interestRate,
  saving,
  monthlyInvest,
  incomeGrowth,
  inheritance,
}: RetireFundsType) {
  const yearsToRetire = ageRetire - ageNow;
  const retirementYears = ageDeath - ageRetire;

  const monthlyRetireIncome =
    monthlyIncome * Math.pow(1 + inflationBeforeRetire, yearsToRetire);
  const realRateRetire = (1 + interestRate) / (1 + inflationAfterRetire) - 1;
  const pv_factor =
    (1 - Math.pow(1 + realRateRetire, -1 * retirementYears)) / realRateRetire;

  const totalRetireFund = monthlyRetireIncome * 12 * pv_factor;

  const fv_saving = saving * Math.pow(1 + interestRate, yearsToRetire);

  let fv_investment_monthly = 0;
  for (let i = 1; i <= yearsToRetire; i++) {
    const investmentYearI =
      monthlyInvest * 12 * Math.pow(1 + incomeGrowth, i - 1);
    const fvYearI =
      investmentYearI * Math.pow(1 + interestRate, yearsToRetire - i);
    fv_investment_monthly += fvYearI;
  }

  const fv_inheritance =
    inheritance * Math.pow(1 + interestRate, yearsToRetire);

  const total = fv_saving + fv_investment_monthly + fv_inheritance;

  return [totalRetireFund, total];
}

interface FamilyFundsType {
  yearsToProvide: number;
  yearsToWork: number;
  incomeYearly: number;
  incomeSpouseYearly: number;
  inflation: number;
  costHome: number;
  debt: number;
  saving: number;
  retireFund: number;
  lifeInsurance: number;
}

export function calculateFamilyFund({
  yearsToProvide,
  yearsToWork,
  incomeYearly,
  incomeSpouseYearly,
  inflation,
  costHome,
  debt,
  saving,
  retireFund,
  lifeInsurance,
}: FamilyFundsType) {
  const incomePV =
    (incomeYearly * (1 - Math.pow(1 + inflation, -1 * yearsToProvide))) /
    inflation;
  console.log(
    `INCOME PV = ${incomeYearly} * ${(1 - Math.pow(1 + inflation, -1 * yearsToProvide)) / inflation}`,
  );
  console.log("INCOME PV :", incomePV);
  const incomeSpousePV =
    (incomeSpouseYearly * (1 - Math.pow(1 + inflation, -1 * yearsToWork))) /
    inflation;

  const total = costHome + debt + incomePV - incomeSpousePV;
  const assetAvailable = saving + retireFund + lifeInsurance;

  const totalLifeInsuranceNeeded = total - assetAvailable;
  console.log("TOTAL LIFE INSURANCE :", totalLifeInsuranceNeeded);
  if (totalLifeInsuranceNeeded > 0) return totalLifeInsuranceNeeded;
  return 0;
}
