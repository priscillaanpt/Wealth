export interface RetireFundType {
  targetRetireMonthlyIncome: number;
  rateAfterRetire: number;
  ageRetire: number;
  ageDeath: number;
}
interface RetireFundsType {
  currentAge: number;
  ageRetire: number;
  ageDeath: number;
  incomeMonthlyRetirement: number;
  inflationBeforeRetire: number;
  inflationAfterRetire: number;
  rate: number;
}
export function calculateRetireFund({
  currentAge,
  ageRetire,
  ageDeath,
  incomeMonthlyRetirement,
  inflationBeforeRetire,
  inflationAfterRetire,
  rate,
}: RetireFundsType) {
  console.log("INCOME OLD", incomeMonthlyRetirement);
  const yearsToRetire = ageRetire - currentAge;
  const retirementYears = ageDeath - ageRetire;

  const incomeMonthlyRetirementFV =
    incomeMonthlyRetirement *
    Math.pow(1 + inflationBeforeRetire, yearsToRetire);
  const realRateRetirement = (1 + rate) / (1 + inflationAfterRetire) - 1;
  console.log("REAL RATE RETIREMENT :", realRateRetirement);
  const pv_factor =
    (1 - Math.pow(1 + realRateRetirement, -1 * retirementYears)) /
    realRateRetirement;

  const totalFund = incomeMonthlyRetirementFV * 12 * pv_factor;
  console.log("YEARS TO RETIRE :", yearsToRetire);
  console.log("RETIREMENT YEARS :", retirementYears);
  console.log("INCOME MONTHLY RETIREMENT FV :", incomeMonthlyRetirementFV);
  console.log("REAL RATE RETIREMENT :", realRateRetirement);
  console.log("PV FACTORE :", pv_factor);
  console.log("TOTAL FUND :", totalFund);
  return totalFund;
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
  const incomePV = incomeYearly * (1 - Math.pow(1 + inflation, -1 * yearsToProvide)) / inflation;
  const incomeSpousePV = incomeSpouseYearly * (1 - Math.pow(1 + inflation, -1 * yearsToWork)) / inflation;

  const total = costHome + debt + incomePV - incomeSpousePV;
  const assetAvailable = saving + retireFund + lifeInsurance;

  const totalLifeInsuranceNeeded = total - assetAvailable;
  if (totalLifeInsuranceNeeded > 0) return totalLifeInsuranceNeeded;
  return 0;
}