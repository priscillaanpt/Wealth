import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { cn } from "~/lib/utils";
import { rubik } from "~/lib/fonts";

export const metadata: Metadata = {
  title: "Wealth",
  description: "Financial Planning App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(rubik.variable, "font-normal antialiased")}>
      <body className="bg-[#F5F6FA]">
        <TRPCReactProvider>
          <Toaster position="bottom-right" />
          <SessionProvider>{children}</SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
