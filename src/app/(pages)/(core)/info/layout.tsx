"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import SidebarInfo from "./components/sidebar-info";

export default function InfoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname().split("/")[2] ?? "personal";
  const [page, setPage] = useState(pathname);
  const { data: session } = useSession();
  return (
    <div className="scrollbar-none w-full py-1 pl-6">
      <div className="mt-3 grid grid-cols-[280px_1fr] overflow-hidden overflow-y-hidden">
        <div className="sticky top-0 overflow-y-hidden">
          <div className="flex h-[580px] flex-col items-center overflow-y-hidden rounded-2xl bg-white py-8">
            <Image
              src={"/images/info/pp.png"}
              alt="Placeholder Profile"
              width={96}
              height={96}
              className=""
            />
            <div className="w-full text-center">
              <p className="text-h4 mt-4 text-[#3A3F63]">
                {session?.user.name ?? "Anonim"}
              </p>
              <p className="text-b2 mt-1 text-[#5A607F]">
                {session?.user.email ?? "example@gmail.com"}
              </p>
              <p className="text-b3 text-[#9699AD]">
                Pembaruan terakhir 12-11-2020
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-0.5">
              <SidebarInfo
                src="/images/info/profile.png"
                name="Informasi Pribadi"
                isActive={page === "personal"}
                setPage={setPage}
              />
              <SidebarInfo
                src="/images/info/money.png"
                name="Informasi Keuangan"
                isActive={page === "finance"}
                setPage={setPage}
              />
              <SidebarInfo
                src="/images/info/health.png"
                name="Rencana Kesehatan"
                isActive={page === "health"}
                setPage={setPage}
              />
              <SidebarInfo
                src="/images/info/retirement.png"
                name="Rencana Pensiun"
                isActive={page === "retirement"}
                setPage={setPage}
              />
              <SidebarInfo
                src="/images/info/family.png"
                name="Rencana Keluarga"
                isActive={page === "family"}
                setPage={setPage}
              />
              <SidebarInfo
                src="/images/info/study.png"
                name="Rencana Pendidikan"
                isActive={page === "education"}
                setPage={setPage}
              />
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-3">
          <div className="mb-4 flex justify-end gap-4">
            <Button
              variant={"ghost"}
              className="text-btn2 w-[100px] rounded-full bg-white text-[#4458FE] shadow-2xl hover:bg-white hover:text-[#71A0FE]"
            >
              Ekspor
            </Button>
            <Button
              type="submit"
              form="form"
              variant={"ghost"}
              className="text-btn2 w-[100px] rounded-full bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] text-white shadow-2xl hover:bg-[#71A0FE] hover:from-[#71A0FE] hover:to-[#71A0FE] hover:text-white"
            >
              Simpan
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
