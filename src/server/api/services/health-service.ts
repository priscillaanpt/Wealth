import { type ProgramType, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import z from "zod";
import type { HospitalType, updatePrograms } from "../types/health-type";

export const programKeys = [
  "Biaya Dokter dan Obat-obatan",
  "Kamar dan Layanan",
  "Bedah dan Ruang Operasi",
  "Penyakit Serius (misalnya kanker)",
  "Kompensasi Disabilitas",
  "Kompensasi Pendapatan Harian",
] as const;

type ProgramKey = (typeof programKeys)[number];

const itemSchema = z.object({
  isChecked: z.boolean(),
  need: z.number().nonnegative(),
  own: z.number().nonnegative(),
});

export const programSchema = z.object(
  Object.fromEntries(programKeys.map((key) => [key, itemSchema])),
);

export const getHospitals = async (db: PrismaClient) => {
  const hospitals = await db.hospital.findMany({
    include: {
      benefits: {
        select: {
          type: true,
        },
      },
    },
  });
  if (!hospitals) {
    throw new TRPCError({
      message: "No Hospital Found!",
      code: "BAD_REQUEST",
    });
  }
  const transformedHospitalData: HospitalType[] = hospitals.map((hospital) => ({
    id: hospital.id,
    name: hospital.name,
    location: hospital.location,
    benefit: hospital.benefits.map((benefit) => benefit.type),
  }));
  return transformedHospitalData;
};

function convertEnumToDisplay(program: ProgramType): ProgramKey {
  switch (program) {
    case "DOCTER_FEE":
      return "Biaya Dokter dan Obat-obatan";
    case "ROOM_FEE":
      return "Kamar dan Layanan";
    case "OPERATION_FEE":
      return "Bedah dan Ruang Operasi";
    case "DISEASE_FEE":
      return "Penyakit Serius (misalnya kanker)";
    case "DISABILITY_FEE":
      return "Kompensasi Disabilitas";
    case "COMPENSATION_FEE":
      return "Kompensasi Pendapatan Harian";
    default:
      throw new Error(`Unknown program`);
  }
}

export const getHospitalProgram = async (
  db: PrismaClient,
  hospitalId: string,
  userId?: string,
) => {
  if (!userId || hospitalId === "") {
    return {};
  }
  const healthPlan = await db.healthPlan.findFirst({
    where: {
      hospitalId: hospitalId,
      userId: userId,
    },
    select: {
      Programs: true,
    },
  });

  const rawPrograms = healthPlan?.Programs ?? [];
  const programMap = new Map<
    string,
    { isChecked: boolean; need: number; own: number }
  >();
  rawPrograms.forEach((p) => {
    const displayName = convertEnumToDisplay(p.program);
    programMap.set(displayName, {
      isChecked: p.isChecked,
      need: Number(p.need),
      own: Number(p.own),
    });
  });

  const filledPrograms = Object.fromEntries(
    programKeys.map((key) => {
      const data = programMap.get(key);
      return [
        key,
        {
          isChecked: data?.isChecked ?? false,
          need: data?.need ?? 0,
          own: data?.own ?? 0,
        },
      ];
    }),
  ) as z.infer<typeof programSchema>;
  return filledPrograms;
};

export const updateHospitalProgram = async (
  db: PrismaClient,
  hospitalId: string,
  input: updatePrograms,
  userId?: string,
) => {
  if (!userId || hospitalId === "") {
    throw new TRPCError({
      message: "No Program Found!",
      code: "BAD_REQUEST",
    });
  }

  const healthPlan = await db.healthPlan.upsert({
    where: {
      userId_hospitalId: {
        userId,
        hospitalId,
      },
    },
    update: {},
    create: {
      userId,
      hospitalId,
    },
  });

  const programMap: Record<keyof updatePrograms, ProgramType> = {
    "Biaya Dokter dan Obat-obatan": "DOCTER_FEE",
    "Kamar dan Layanan": "ROOM_FEE",
    "Bedah dan Ruang Operasi": "OPERATION_FEE",
    "Penyakit Serius (misalnya kanker)": "DISEASE_FEE",
    "Kompensasi Disabilitas": "DISABILITY_FEE",
    "Kompensasi Pendapatan Harian": "COMPENSATION_FEE",
  };

  await Promise.all(
    (
      Object.entries(input) as [
        keyof updatePrograms,
        updatePrograms[keyof updatePrograms],
      ][]
    ).map(async ([label, data]) => {
      const program = programMap[label];
      if (!program) return;

      await db.program.upsert({
        where: {
          healthPlanId_program: {
            program,
            healthPlanId: healthPlan.id,
          },
        },
        create: {
          program,
          healthPlanId: healthPlan.id,
          isChecked: data.isChecked,
          need: data.need,
          own: data.own,
        },
        update: {
          isChecked: data.isChecked,
          need: data.need,
          own: data.own,
        },
      });
    }),
  );

  return { success: true };
};
