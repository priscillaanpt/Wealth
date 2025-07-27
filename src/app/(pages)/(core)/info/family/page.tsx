"use client";
import Image from "next/image";
import { useState } from "react";
import { Input } from "~/components/ui/input";

export default function Page() {
  const [, setTest] = useState("0");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
        <h1 className="text-h5 text-blacknavy">
          KEBUTUHAN ANDA AKAN ASURANSI JIWA
        </h1>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
        <div className="felx-row flex w-[447px] items-center gap-4">
          <Image
            src={"/images/info/house.png"}
            alt="House Icon"
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <h1 className="text-h5 text-blacknavy">
            PERKIRAAN PENGELUARAN KELUARGA ANDA JIKA ANDA MENINGGAL DUNIA
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p>Biaya Rumah tangga</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Utang yang belum dibayar</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Pendapatan tahunan Anda</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Berapa tahun pendapatan harus diberikan ?</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Tabungan dan investasi Anda saat ini ?</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Tabungan pensiun Anda saat ini</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Nilai asuransi jiwa yang berlaku pada hidup Anda</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Tingkat inflasi</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-6">
        <div className="felx-row flex w-[447px] items-center gap-4">
          <Image
            src={"/images/info/spouse.png"}
            alt="House Icon"
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <h1 className="text-h5 text-blacknavy">
            DENGAN ASUMSI PASANGAN ANDA AKAN BEKERJA SETELAH KEMATIAN ANDA
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p>Pendapatan tahunan pasangan Anda</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
          <div>
            <p>Berapa lama pasangan Anda berharap untuk bekerja?</p>
            <Input type="number" onChange={(e) => setTest(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}
