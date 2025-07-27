"use client";
import Image from "next/image";
import { parseCurrency } from "~/app/utils/parse";
import { Input } from "~/components/ui/input";

interface RetirementAgeInputProps {
  type: "young" | "old" | "death";
  age: string;
  income: string;
  handleChangeAge: (type: "young" | "old" | "death", value: string) => void;
  handleChangeIncome: (type: "young" | "old" | "death", value: string) => void;
}

export default function RetirementAgeInput({ type, age, income, handleChangeAge, handleChangeIncome }: RetirementAgeInputProps) {
  let titleAgeLocal;
  let titleIncomeLocal;
  // console.log("RETIREMENT AGE :", age);

  if (type === "young") {
    titleAgeLocal = "Usia saat ini";
    titleIncomeLocal = "Pendapatan bulanan";
  } else if (type === "old") {
    titleAgeLocal = "Usia pensiun";
    titleIncomeLocal = "Pendapatan bulanan";
  } else {
    titleAgeLocal = "Harapan hidup";
    titleIncomeLocal = "Uang warisan bulanan";
  }

  return (
    <div className="flex flex-col gap-4 bg-[#F5F5FA] p-4">
      <div className="flex flex-row gap-4">
        <Image
          src={`/images/info/${type}.png`}
          alt={`${type} Icon`}
          width={44}
          height={60}
          className="h-16 w-14 scale-80"
        />
        <div className="flex flex-col">
          {titleAgeLocal}
          <Input
            inputMode="numeric"
            pattern="[0-9]*"
            value={age}
            onChange={(e) => handleChangeAge(type, e.target.value)}
            className="no-spinner text-blacknavy font-rubik !text-h2 w-20 rounded-[4px] border-1 border-[#DAE0F2] bg-white text-center"
          />
        </div>
      </div>
      <div>
        {titleIncomeLocal}
        <Input
          value={parseCurrency(income)}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => handleChangeIncome(type, e.target.value)}
          className="no-spinner text-blacknavy font-rubik w-full rounded-[4px] border-1 border-[#DAE0F2] bg-white text-center"
        />
        <p className="text-b1 text-black">
          {parseCurrency(Number(income) * 12)} / tahun
        </p>
      </div>
    </div>
  );
}
