import type z from "zod";
import type { programSchema } from "../schemas/health-schema";

export type ProgramSchema = z.infer<typeof programSchema>;
export type ProgramTypeName = keyof ProgramSchema;