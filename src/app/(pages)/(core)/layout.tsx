import type { ReactNode } from "react";
import Navbar from "~/app/_components/layout/navbar";
import { SidebarProvider } from "~/components/ui/sidebar";
import AppSidebar from "../../_components/layout/sidebar";

export default function CoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Navbar />
      <SidebarProvider open={true} className="flex">
        <AppSidebar />
        <div className="mt-[68px] w-full py-0">{children}</div>
      </SidebarProvider>
    </div>
  );
}
