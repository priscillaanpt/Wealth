import { formatToRupiah } from "~/lib/utils";

interface EducationTotalBannerProps {
  totalCost: number;
}

export default function EducationTotalBanner({
  totalCost,
}: EducationTotalBannerProps) {
  return (
    <div className="flex flex-row justify-between bg-white p-6">
      <h1 className="text-h5 text-blacknavy font-rubik font-bold">
        TOTAL BIAYA PENDIDIKAN ANAK ANDA
      </h1>
      <h1 className="text-h5 text-blacknavy font-rubik font-bold">
        Rp {formatToRupiah(totalCost.toFixed(2).toString())}
      </h1>
    </div>
  );
}
