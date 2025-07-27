import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const publicRoutes: string[] = ["/"];
const unauthenticatedRoutes: string[] = ["/signin", "/signup"];

export async function middleware(req: NextRequest) {
  const allCookies = req.cookies.getAll();

  console.log("Cookies:");
  allCookies.forEach(({ name, value }) => {
    console.log(`${name}: ${value}`);
  });
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: true });
  const requestedPath = req.nextUrl.pathname;

  console.log(`Token: ${token?.email}`)
  console.log(`Requested url: ${requestedPath}`)

  if(requestedPath == "/"){
    return NextResponse.redirect(new URL("/dashboard",req.url))
  }

  if (token) {
    // Redirect auth user trying to visit unauth pages
    if (unauthenticatedRoutes.includes(requestedPath)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } else {
    // Redirect unauth user
    if (
      !publicRoutes.includes(requestedPath) &&
      !unauthenticatedRoutes.includes(requestedPath)
    ) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/","/signin", "/signup", "/info", "/dashboard"],
};
