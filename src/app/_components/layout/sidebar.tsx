import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar className="mt-[68px]" side="left">
      <SidebarContent className="bg-[#222653]">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-col justify-between gap-2">
              <SidebarMenuButton asChild className="py-0 pr-0">
                <Link
                  href={"/info"}
                  className="group mx-3 h-[44px] max-w-[218px] from-[#4F8AFF] to-[#4B5EFF] p-0 hover:bg-gradient-to-tr"
                >
                  <Image
                    src="/images/layout/profile.png"
                    alt="Profile"
                    width={24}
                    height={24}
                  />
                  <span className="font-rubik text-btn3 flex h-full w-full items-center text-[#B3C0E7] hover:text-[#FFFFFF]">
                    Info Pribadi
                  </span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="py-0 pr-0">
                <Link
                  href={"/dashboard"}
                  className="group mx-3 h-[40px] max-w-[218px] from-[#4F8AFF] to-[#4B5EFF] p-0 hover:bg-gradient-to-tr"
                >
                  <Image
                    src="/images/layout/dashboard logo.png"
                    alt="Profile"
                    width={24}
                    height={24}
                  />
                  <span className="font-rubik text-btn3 flex h-full w-full items-center text-[#B3C0E7] hover:text-[#FFFFFF]">
                    Dashboard
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
