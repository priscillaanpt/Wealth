import type { UserStatus } from "@prisma/client";
import { z } from "zod";

export const STATUS_DISPLAY_MAP: Record<UserStatus, string> = {
  BELUM_MENIKAH: "Belum Menikah",
  MENIKAH: "Menikah",
  CERAI: "Cerai",
};

export const REVERSE_STATUS_MAP: Record<string, UserStatus> =
  Object.fromEntries(
    Object.entries(STATUS_DISPLAY_MAP).map(([key, value]) => [
      value,
      key as UserStatus,
    ]),
  );

export const infoSchema = z.object({
  name: z.string(),
  status: z.string(),
  birthDate: z.date(),
  phoneNumber: z.string().regex(/^[0-9]+$/),
  job: z.string(),
  company: z.string(),
  addressLine: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string().regex(/^[0-9]+$/),
});

export const healthSchema = z.object({
  rumahsakit: z.string().min(1),
});
