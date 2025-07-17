"use client";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import ForgetForm from "./components/forget-form";

export default function ForgotPassword() {
  const [fixedEmail, setFixedEmail] = useState<string | null>(null);
  return (
    <div className="w-1/2">
      <div className="mb-4">
        <h1 className="text-h1 text-blacknavy">LUPA KATA SANDI?</h1>
      </div>

      {!fixedEmail && (
        <>
          <ForgetForm setFixedEmail={setFixedEmail} />
          <Link
            href={"/signin"}
            className="text-b1 text-whitenavy mt-4 flex text-sm hover:underline"
          >
            Ingat kata sandi anda ? Masuk
          </Link>
        </>
      )}

      {fixedEmail && (
        <div className="w-full">
          <p className="bg-[#D9EEE1] p-5">
            <CheckCircleIcon
              width={20}
              height={20}
              className="mr-2 inline-block text-[#04AA6D]"
            />
            We&apos;ve sent an email to {fixedEmail} with instructions.
          </p>
          <p className="mt-3 mb-5 text-sm text-gray-500">
            If the email doesn&apos;t show up soon, check your spam folder. We
            sent it from iom-itb@gmail.com
          </p>
          <Link href={"/signin"}>
            <Button
              variant={"ghost"}
              className="text-btn1 mt-6 min-h-[54px] w-full max-w-[240px] rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] px-8 text-center text-white hover:text-white"
            >
              <p className="text-btn1 hover:text-white">Return to Sign In</p>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
