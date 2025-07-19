import z from "zod";

export const programSchema = z.object({
  "Biaya Dokter dan Obat-obatan": z.object({
    isChecked: z.boolean(),
    need: z.number().nonnegative(),
    own: z.number().nonnegative(),
  }),
  "Kamar dan Layanan": z.object({
    isChecked: z.boolean(),
    need: z.number().nonnegative(),
    own: z.number().nonnegative(),
  }),
  "Bedah dan Ruang Operasi": z.object({
    isChecked: z.boolean(),
    need: z.number().nonnegative(),
    own: z.number().nonnegative(),
  }),
  "Penyakit Serius (misalnya kanker)": z.object({
    isChecked: z.boolean(),
    need: z.number().nonnegative(),
    own: z.number().nonnegative(),
  }),
  "Kompensasi Disabilitas": z.object({
    isChecked: z.boolean(),
    need: z.number().nonnegative(),
    own: z.number().nonnegative(),
  }),
  "Kompensasi Pendapatan Harian": z.object({
    isChecked: z.boolean(),
    need: z.number().nonnegative(),
    own: z.number().nonnegative(),
  }),
});

export const HealthQuerySchema = z.object({
  hospitalId: z.string(),
});

export const updateHospitalPrograms = z.object({
  HospitalId: z.string(),
  program: programSchema,
});
