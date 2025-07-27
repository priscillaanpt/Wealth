import { z } from "zod";

export const HealthQuerySchema = z.object({
  hospitalId: z.string(),
});
