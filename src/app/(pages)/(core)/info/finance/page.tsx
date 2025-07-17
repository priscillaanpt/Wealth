"use client";
import { Accordion } from "~/components/ui/accordion";
import FinanceAccordion from "./finance-accordion";
import { useEffect, useState, type FormEvent } from "react";
import type {
  ExpenseFieldData,
  ExpenseMonthData,
  IncomeFieldData,
  IncomeMonthData,
} from "~/app/types/finance-type";
import FinanceDisplay from "./finance-display";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

export default function Page() {
  const { data: incomeInfo } = api.user.getPersonalIncome.useQuery();
  const { data: expenseInfo } = api.user.getPersonalExpense.useQuery();

  const [incomeData, setIncomeData] = useState<IncomeFieldData>({
    salary: 0,
    bonus: 0,
    commission: 0,
    interestIncome: 0,
    dividends: 0,
    otherIncome: 0,
  });

  const [incomeMonth, setIncomeMonth] = useState<IncomeMonthData>({
    salaryMonths: 1,
    bonusMonths: 1,
    commissionMonths: 1,
    interestIncomeMonths: 1,
    otherIncomeMonths: 1,
    dividendsMonths: 1,
  });

  const [expenseData, setExpenseData] = useState<ExpenseFieldData>({
    mortgage: 0,
    property: 0,
    electricity: 0,
    waterSewerTrash: 0,
    transport: 0,
    phone: 0,
    internet: 0,
    home: 0,
    personal: 0,
    insurance: 0,
    entertainment: 0,
    subscriptions: 0,
    investment: 0,
  });

  const [expenseMonth, setExpenseMonth] = useState<ExpenseMonthData>({
    mortgageMonths: 1,
    propertyMonths: 1,
    electricityMonths: 1,
    waterSewerTrashMonths: 1,
    transportMonths: 1,
    phoneMonths: 1,
    internetMonths: 1,
    homeMonths: 1,
    personalMonths: 1,
    insuranceMonths: 1,
    entertainmentMonths: 1,
    subscriptionsMonths: 1,
    investmentMonths: 1,
  });

  const [showDialog, setShowDialog] = useState(false);

  const totalIncome = (
    Object.keys(incomeData) as (keyof typeof incomeData)[]
  ).reduce(
    (sum, curr) => sum + incomeData[curr] / incomeMonth[`${curr}Months`],
    0,
  );

  const totalExpense = (
    Object.keys(expenseData) as (keyof typeof expenseData)[]
  ).reduce(
    (sum, curr) => sum + expenseData[curr] / expenseMonth[`${curr}Months`],
    0,
  );

  const updateIncome = api.user.updatePersonalncome.useMutation({
    onSuccess: () => {
      setShowDialog(true);
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  const updateExpense = api.user.updatePersonalExpense.useMutation({
    onSuccess: () => {
      setShowDialog(true);
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateIncome.mutate({
      ...incomeData,
      ...incomeMonth,
    });

    updateExpense.mutate({
      ...expenseData,
      ...expenseMonth,
    });
  };

  useEffect(() => {
    if (incomeInfo) {
      const [baseIncome, incomeMonths] = Object.entries(incomeInfo).reduce(
        ([base, months], [key, value]) => {
          if (key.endsWith("Months")) {
            months[key] = value;
          } else {
            base[key] = value;
          }
          return [base, months];
        },
        [{}, {}] as [Record<string, number>, Record<string, number>],
      );

      setIncomeData(baseIncome as IncomeFieldData);
      setIncomeMonth(incomeMonths as IncomeMonthData);

      console.log("Income Data: " + JSON.stringify(incomeData, null, 2));
    }

    if (expenseInfo) {
      const [baseExpense, expenseMonths] = Object.entries(expenseInfo).reduce(
        ([base, months], [key, value]) => {
          if (key.endsWith("Months")) {
            months[key] = value;
          } else {
            base[key] = value;
          }
          return [base, months];
        },
        [{}, {}] as [Record<string, number>, Record<string, number>],
      );
      setExpenseData(baseExpense as ExpenseFieldData);
      setExpenseMonth(expenseMonths as ExpenseMonthData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomeInfo, expenseInfo]);

  return (
    <div className="flex h-auto flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-xl p-0">
        <Accordion type="multiple" className="flex w-full flex-col gap-4">
          <FinanceDisplay
            label={"INFORMASI KEUANGAN"}
            incomePerMonth={totalIncome}
            expensePerMonth={totalExpense}
            value={"items-1"}
          />

          <form onSubmit={onSubmit} id="form" className="flex flex-col gap-4">
            <FinanceAccordion<IncomeFieldData, IncomeMonthData>
              label="PENDAPATAN PRIBADI"
              fieldData={incomeData}
              fieldMonth={incomeMonth}
              onDataChange={setIncomeData}
              onMonthChange={setIncomeMonth}
              totalValuePerMonth={totalIncome}
              value="items-2"
            />

            <FinanceAccordion<ExpenseFieldData, ExpenseMonthData>
              label="BIAYA PRIBADI"
              fieldData={expenseData}
              fieldMonth={expenseMonth}
              onDataChange={setExpenseData}
              onMonthChange={setExpenseMonth}
              totalValuePerMonth={totalExpense}
              value="items-3"
            />
          </form>
        </Accordion>
        <Dialog open={showDialog}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Update Berhasil!</DialogTitle>
              <DialogDescription>
                Financial info anda telah diperbarui!
              </DialogDescription>
            </DialogHeader>
            <Button
              className="text-btn1 rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] py-4 text-center text-white"
              onClick={() => setShowDialog(false)}
            >
              Lanjut
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
