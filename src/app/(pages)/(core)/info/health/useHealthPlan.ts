import { useEffect, useState } from "react";
import type { HospitalType } from "~/server/api/types/health-type";
import { api } from "~/trpc/react";

const useHealthPlan = () => {
  const [selectedHospital, setSelectedHospital] = useState<HospitalType>({
    id: "",
    name: "",
    benefit: [],
    location: "",
  });
  const [hospital, setHospitalData] = useState<HospitalType[]>([]);
  const { data: hospitalData } = api.health.getHospitals.useQuery();
  useEffect(() => {
    if (hospitalData) {
      setHospitalData(hospitalData);
    }
  }, [hospitalData]);

  return {
    selectedHospital,
    hospital,
    setSelectedHospital,
  };
};

export default useHealthPlan;
