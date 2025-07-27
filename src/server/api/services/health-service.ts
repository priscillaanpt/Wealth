import { type PrismaClient } from "@prisma/client";

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

  return hospitals;
};

export const getHospitalPrograms = async (
  db: PrismaClient,
  hospitalId: string,
  userId?: string,
) => {
  const programs = await db.hospitalProgram.findMany({
    where: {
      hospitalId,
    },
    include: {
      programType: true,
      HealthPlan: {
        where: {
          userId: userId,
        },
      },
    },
  });

  const transformedPrograms = programs.map((program) => ({
    name: program.programType.name,
    need: program.HealthPlan[0]?.need ?? 0,
    own: program.HealthPlan[0]?.own ?? 0,
  }));
  return transformedPrograms;
};
