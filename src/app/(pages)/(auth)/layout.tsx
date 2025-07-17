import Image from "next/image";
import type { ReactNode } from "react";
import NavbarAuth from "./components/navbar-auth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-screen w-full grid-cols-[480px_1fr]">
      <div className="flex h-screen w-[480px] flex-col">
        <div className="relative inset-0 -z-10 flex h-full">
          <Image
            src="/images/auth/city.png"
            alt="Background"
            width={480}
            height={480}
            className="object-cover"
          />
        </div>
        <div className="absolute h-screen w-[480px] bg-gradient-to-tr from-[#2E3CB3] to-[#222653] mix-blend-multiply"></div>
        <div className="absolute inset-0 flex w-[480px] flex-col gap-[60px] px-10 py-10">
          <Image
            src={"/images/auth/logo.png"}
            alt="Logo"
            width={120}
            height={40}
            className=""
          />
          <div className="text-title w-full text-white">
            <h1>
              DO IT <span className="text-[#71A0FE]">NOW</span>
            </h1>
            <h1>
              SOMETIMES <span className="text-[#71A0FE]">LATER</span>
            </h1>
            <h1>
              BECOME <span className="text-[#71A0FE]">NEVER</span>
            </h1>
          </div>
        </div>
      </div>
      <div>
        <NavbarAuth />
        <div className="flex h-[calc(100vh-72px)] w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
