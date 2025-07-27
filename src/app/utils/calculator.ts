export interface RetireFundType {
  targetRetireMonthlyIncome: number;
  rateAfterRetire: number;
  ageRetire: number;
  ageDeath: number;
}

export function calculateRetireFund({
  targetRetireMonthlyIncome,
  rateAfterRetire,
  ageRetire,
  ageDeath,
}: RetireFundType) {
  const r = rateAfterRetire / (100 * 12);
  const n = (ageDeath - ageRetire) * 12;

  if (r === 0) {
    return targetRetireMonthlyIncome * n;
  }

  const targetFund =
    targetRetireMonthlyIncome * ((1 - Math.pow(1 + r, -n)) / r) * (1 + r);
  return targetFund;
}
