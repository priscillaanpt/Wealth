"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NavbarAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const isSignIn = pathname === "/signin";
  function handleClick() {
    if (isSignIn) router.push("/signup");
    else router.push("/signin");
  }
  return (
    <div className="mt-8 mr-8 flex justify-end">
      <div className="flex h-10 items-center justify-between gap-6">
        <p className="text-b1 text-[#6A74A5]">
          {isSignIn ? "Belum punya akun ?" : "Sudah punya akun ?"}
        </p>
        <Button
          className="text-btn2 h-full min-w-[137px] rounded-full border-2 border-[#4F8AFF] text-[#4458FE] hover:border-[#71A0FE] hover:bg-[#ffffff] hover:text-[#71A0FE]"
          variant={"ghost"}
          onClick={() => handleClick()}
        >
          {isSignIn ? "Mulai" : "Masuk"}
        </Button>
      </div>
    </div>
  );
}
