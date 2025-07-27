"use client";
import { Input } from "~/components/ui/input";
import RetirementAgeInput from "./retirement-age-input";
import useRetirementPlan from "../useRetirementPlan";
import { parseCurrency } from "~/app/utils/parse";
import { calculateRetireFund } from "~/app/utils/calculator";

export default function RetirementAge() {
  const {
    age,
    income,
    rateBeforeRetire,
    rateAfterRetire,
    handleChangeAge,
    handleChangeIncome,
    setRateBeforeRetire,
    setRateAfterRetire,
    isValidRetireFund,
  } = useRetirementPlan();
  console.log("RATE BEFORE :", rateBeforeRetire);
  console.log("RATE AFTER", rateAfterRetire);
  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl bg-white p-6">
        <h1 className="text-h5 text-blacknavy font-rubik font-bold">
          RENCANA PENSIUN
        </h1>
        <div className="grid grid-cols-3 gap-4">
          <RetirementAgeInput
            type="young"
            age={age.young}
            income={income.young}
            handleChangeAge={handleChangeAge}
            handleChangeIncome={handleChangeIncome}
          />
          <RetirementAgeInput
            type="old"
            age={age.old}
            income={income.old}
            handleChangeAge={handleChangeAge}
            handleChangeIncome={handleChangeIncome}
          />
          <RetirementAgeInput
            type="death"
            age={age.death}
            income={income.death}
            handleChangeAge={handleChangeAge}
            handleChangeIncome={handleChangeIncome}
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <p className="text-b1 text-whitenavy font-rubik">
            Tahun hingga pensiun :
          </p>
          <p className="text-h2 text-blacknavy font-rubik">
            {new Date().getFullYear() + Number(age.old) - Number(age.young)}
          </p>
        </div>

        <h1 className="text-blacknavy text-h3 font-rubik">
          Tingkat Inflasi untuk Biaya
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p>Tingkat inflasi sebelum pensiun</p>
            <div className="relative">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={rateBeforeRetire}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d.]/g, "");
                  setRateBeforeRetire(Number(raw));
                }}
                className="rounded-[4px] border-1 border-[#DAE0F2] bg-white pr-8"
              />
              <span className="text-blacknavy pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-sm">
                %
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <p>Tingkat inflasi pasca pensiun</p>
            <div className="relative">
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                value={rateAfterRetire}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d.]/g, "");
                  setRateAfterRetire(Number(raw));
                }}
                className="rounded-[4px] border-1 border-[#DAE0F2] bg-white pr-8"
              />
              <span className="text-blacknavy pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-sm">
                %
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between bg-white p-6">
        <h1 className="text-h5 text-blacknavy font-rubik font-bold">
          ANDA AKAN MEMBUTUHKAN TABUNGAN PENSIUN SEBESAR
        </h1>
        <h1 className="text-h5 text-blacknavy font-rubik font-bold">
          {isValidRetireFund({
            ageDeath: Number(age.death),
            ageRetire: Number(age.old),
            rateAfterRetire: Number(rateAfterRetire),
            targetRetireMonthlyIncome: Number(income.old),
          }) &&
            parseCurrency(
              calculateRetireFund({
                ageDeath: Number(age.death),
                ageRetire: Number(age.old),
                rateAfterRetire: Number(rateAfterRetire),
                targetRetireMonthlyIncome: Number(income.old),
              }),
            )}

          {!isValidRetireFund({
            ageDeath: Number(age.death),
            ageRetire: Number(age.old),
            rateAfterRetire: Number(rateAfterRetire),
            targetRetireMonthlyIncome: Number(income.old),
          }) && "NGGAK ADA"}
        </h1>
      </div>
    </>
  );
}
