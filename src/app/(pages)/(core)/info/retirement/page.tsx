import RetirementAge from "./components/retirement-age";
import RetirementChart from "./components/retirement-chart";
import RetirementPlan from "./components/retirement-plan";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <RetirementAge />
      <div className="grid grid-cols-2 gap-4">
        <RetirementPlan />
        <RetirementChart />
      </div>
    </div>
  );
}
