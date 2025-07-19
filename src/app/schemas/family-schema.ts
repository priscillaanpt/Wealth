import z from "zod";

export const familySchema = z.object({
  "Biaya rumah tangga": z.number().nonnegative(),
  "Utang yang belum dibayar": z.number().nonnegative(),
  "Pendapatan tahunan anda": z.number().nonnegative(),
  "Berapa tahun pendapatan harus diberikan ?": z.number().nonnegative(),
  "Tabungan dan investasi anda saat ini ?": z.number().nonnegative(),
  "Tabungan pensiun Anda saat ini": z.number().nonnegative(),
  "Nilai asuransi jiwa yang berlaku pada hidup anda": z.number().nonnegative(),
  "Tingkat inflasi": z.number().nonnegative(),
  "Pendapatan tahunan pasangan Anda": z.number().nonnegative(),
  "Berapa lama pasangan Anda berharap untuk bekerja?": z.number().nonnegative(),
});
