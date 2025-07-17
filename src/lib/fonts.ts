import localFont from "next/font/local";

export const rubik = localFont({
  src: [
    {
      path: "../app/fonts/Rubik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/Rubik-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Rubik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/Rubik-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/Rubik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-rubik",
  fallback: ["sans-serif"],
});
