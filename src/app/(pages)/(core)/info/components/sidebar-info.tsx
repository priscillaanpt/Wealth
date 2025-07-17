"use client";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

interface SidebarInfoProps {
  src: string;
  name: string;
  isActive: boolean;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}
export default function SidebarInfo({
  src,
  name,
  isActive,
  setPage,
}: SidebarInfoProps) {
  const router = useRouter();
  function handleClick() {
    let currentPage = "personal";

    if (name === "Informasi Pribadi") currentPage = "personal";
    else if (name === "Informasi Keuangan") currentPage = "finance";
    else if (name === "Rencana Kesehatan") currentPage = "health";
    else if (name === "Rencana Pensiun") currentPage = "retirement";
    else if (name === "Rencana Keluarga") currentPage = "family";
    else if (name === "Rencana Pendidikan") currentPage = "education";

    setPage(currentPage);
    router.push(`/info/${currentPage}`);
  }

  return (
    <Button
      onClick={() => handleClick()}
      className={cn(
        "flex h-14 w-[272px] justify-baseline gap-4 py-0 pr-0 hover:shadow-sm",
        isActive && "bg-blue-100",
      )}
      variant={"ghost"}
    >
      <div className="flex h-10 min-w-[40px] items-center justify-center rounded-[8px] bg-[#F4F7FF]">
        <Image src={src} alt="Sidebar Info" width={24} height={24} />
      </div>
      <p
        className={cn(
          "text-b2 flex h-full w-full items-center",
          isActive && "text-btn3",
        )}
      >
        {name}
      </p>
    </Button>
  );
}
