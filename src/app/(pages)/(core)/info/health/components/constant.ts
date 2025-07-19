/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import type { HospitalType } from "~/server/api/types/health-type";

export function groupHospital({ hospitals }: { hospitals: HospitalType[] }) {
  const groupedHospitals: Record<string, HospitalType[]> = {};
  hospitals.forEach((hospital) => {
    if (!groupedHospitals[hospital.location]) {
      groupedHospitals[hospital.location] = [];
    }
    groupedHospitals[hospital.location]!.push(hospital);
  });

  return groupedHospitals;
}

export const benefitType = [
  "RAWAT_INAP",
  "RAWAT_JALAN",
  "BERSALIN",
  "KESEHATAN_GIGI",
];

export function parseBenefit(value: string): string {
  if (value === "RAWAT_INAP") return "Rawat Inap";
  if (value === "RAWAT_JALAN") return "Rawat Jalan";
  if (value === "BERSALIN") return "Bersalin";
  return "Kesehatan Gigi";
}

export const healthProgram = [
  "Biaya Dokter dan Obat-obatan",
  "Kamar dan Layanan",
  "Bedah dan Ruang Operasi",
  "Penyakit Serius (misalnya kanker)",
  "Kompensasi Disabilitas",
  "Kompensasi Pendapatan Harian",
];
