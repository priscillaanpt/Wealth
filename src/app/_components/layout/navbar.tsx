import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 h-[68px] w-full bg-white">
      <Image
        src="/images/layout/Logo.png"
        alt="Logo"
        width={120}
        height={40}
        className="mt-2 ml-6"
      />
    </nav>
  );
}
