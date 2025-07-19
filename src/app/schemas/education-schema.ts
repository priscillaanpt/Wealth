import z from "zod";

export const educationStage = z.object({
  id: z.string(),
  stageName: z.string(),
  schoolType: z.enum(["NEGERI", "SWASTA"]),
  period: z.coerce.number(),
  costBeforeInflation: z.coerce.number(),
  inflationRate: z.coerce.number(),
  childAge: z.coerce.number(),
})

export const educationSchema = z.object({
  childName: z.string(),
  birthDate: z.date(),
  fundAllocated: z.coerce.number(),
  stages: z.array(educationStage)
});

export const addNewEducation = z.object({
  childName: z.string(),
  birthDate: z.date(),
  fundAllocated: z.coerce.number(),
})