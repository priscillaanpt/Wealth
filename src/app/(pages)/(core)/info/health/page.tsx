"use client";

import HealthForm from "./components/health-form";
import HealthTable from "./components/health-table";
import useHealthPlan from "./useHealthPlan";

export default function Page() {
  const { hospital, selectedHospital, setSelectedHospital } = useHealthPlan();
  console.log("SELECTED HOSPITAL :", selectedHospital);
  return (
    <div className="flex flex-col gap-4">
      <HealthForm hospitals={hospital} onSelectHospital={setSelectedHospital} />
      <HealthTable selectedHospital={selectedHospital} />
    </div>
  );
}
