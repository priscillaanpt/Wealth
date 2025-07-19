import { type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const ChildInfoSchema = z.object({
  childId: z.string(),
})

type ChildInfoType = {
  childId: string
  userId: string
}

type ChildListType = {
  userId: string
}

export const getChildEducationPlanIdList = async (db: PrismaClient, input: ChildListType) => {
  const childList = await db.educationPlan.findMany({
    where: {
      parentId: input.userId
    },
    include: {
      educationStages: {
        select: {
          costBeforeInflation: true,
          inflationRate: true,
        }
      }
    }
  })

  const totalCost = childList.reduce((acc, child) =>
    acc + child.educationStages.reduce((childTotal, stage) =>
      childTotal + stage.costBeforeInflation * (1 + stage.inflationRate / 100),
      0),
    0)

  return { childList, totalCost }
}

export const getChildEducationPlan = async (db: PrismaClient, input: ChildInfoType) => {
  const childInfo = await db.educationPlan.findFirst({
    where: {
      id: input.childId
    },
    include: {
      educationStages: {
        orderBy: {
          childAge: "asc",
        }
      },
      parent: {
        select: {
          personalInfo: {
            select: {
              birthDate: true
            }
          }
        }
      }
    }
  })

  if (!childInfo) {
    throw new TRPCError({ message: "No Child's education plan exists with that Id", code: "BAD_REQUEST" })
  }

  if (childInfo.parentId !== input.userId) {
    throw new TRPCError({ message: "You are not allowed to access this resource!", code: "FORBIDDEN" })
  }

  const parentBirthDate = childInfo.parent.personalInfo?.birthDate;
  const childBirthDate = childInfo.birthDate;

  const parentCurrentAge = new Date().getFullYear() - (parentBirthDate?.getFullYear() ?? 30)
  const childCurrentAge = new Date().getFullYear() - childBirthDate.getFullYear()

  const stagesFormatted = childInfo.educationStages.map((stage) => {
    const childDiffYear = stage.childAge - childCurrentAge
    return ({
      ...stage,
      parentAge: parentCurrentAge + childDiffYear
    })
  })

  const childInfoFormatted = {
    ...childInfo,
    educationStages: stagesFormatted,
    parent: undefined
  }

  return childInfoFormatted
};

export const AddChildEducationPlanSchema = z.object({
  childName: z.string(),
  birthDate: z.date(),
  fundAllocated: z.number(),
})

export type AddChildEducationPlanType = {
  childName: string
  birthDate: Date
  fundAllocated: number
  parentId: string
}

const EducationStagesIndo = [
  { stageName: "Pra-TK", childAge: 3 }, { stageName: "TK", childAge: 4 }, { stageName: "SD", childAge: 6 }, { stageName: "SMP", childAge: 12 }, { stageName: "SMA", childAge: 15 }, { stageName: "S1", childAge: 18 }
] as const

export const addChildEducationPlan = async (db: PrismaClient, input: AddChildEducationPlanType) => {
  const existingParent = await db.user.findFirst({
    where: {
      id: input.parentId
    }
  })

  if (!existingParent) {
    throw new TRPCError({ message: "No user exists with that parent ID!", code: "BAD_REQUEST" })
  }

  const newChild = await db.educationPlan.create({
    data: input,
    select: {
      id: true
    }
  })

  const stageFormatted = EducationStagesIndo.map((stage) => ({
    ...stage,
    childId: newChild.id
  }))

  await db.educationStage.createMany({
    data: stageFormatted
  })

  return newChild
}

export const EducationStageSchema = z.object({
  id: z.string(),
  stageName: z.string(),
  schoolType: z.enum(["NEGERI", "SWASTA"]),
  period: z.number(),
  costBeforeInflation: z.number(),
  inflationRate: z.number(),
})

export const UpdateChildEducationPlanSchema = z.object({
  childId: z.string(),
  childName: z.string(),
  birthDate: z.date(),
  fundAllocated: z.number(),
  stages: z.array(EducationStageSchema)
});

type EducationStageType = {
  id: string,
  stageName: string,
  schoolType: "NEGERI" | "SWASTA",
  period: number,
  costBeforeInflation: number,
  inflationRate: number,
}

export type UpdateChildEducationPlanType = {
  childId: string,
  childName: string,
  birthDate: Date,
  fundAllocated: number,
  stages: EducationStageType[],

  parentId: string
}

export const updateChildEducationPlan = async (db: PrismaClient, input: UpdateChildEducationPlanType) => {
  const { parentId, childId, stages, ...otherData } = input

  const existingParent = await db.user.findFirst({
    where: {
      id: parentId
    }
  })

  if (!existingParent) {
    throw new TRPCError({ message: "No user exists with that parent ID!", code: "BAD_REQUEST" })
  }

  await db.educationPlan.update({
    where: {
      id: childId,
    },
    data: otherData
  })

  await Promise.all(stages.map((val) =>
    db.educationStage.update({
      where: {
        id: val.id
      },
      data: val
    })
  ))
}

