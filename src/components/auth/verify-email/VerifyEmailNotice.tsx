"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { api } from "~/trpc/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { CircleAlertIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";

interface Props {
  token: string;
  setEmailVerified: Dispatch<SetStateAction<boolean>>;
}

export default function VerifyEmailNotice({ token, setEmailVerified }: Props) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [successMsg, setSuccessMsg] = useState("");

  let headingText;
  switch (status) {
    case "success":
      headingText = "Email verification Done!";
      break;
    case "error":
      headingText = "Email verification Failed";
      break;
    default:
      headingText = "Please wait while we're verifying your email";
  }

  const verifyEmail = api.auth.verifyEmail.useMutation({
    onSuccess: (data) => {
      setStatus("success");
      setSuccessMsg(
        data.type === "signup"
          ? "Welcome! Your email is verified."
          : "Email updated successfully!",
      );
    },
    onError: (error) => {
      console.error(error);
      setStatus("error");
    },
  });

  useEffect(() => {
    if (typeof token === "string" && token) {
      verifyEmail.mutate({ token });
    } else {
      setStatus("error");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="w-1/2">
      <div className="mb-4">
        <h1 className="text-h1 text-blacknavy">VERIFY EMAIL</h1>
        <p className="text-b1 text-whitenavy">{headingText}</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {status === "loading" && (
          <Skeleton className="h-[80px] w-full bg-gray-400" />
        )}
        {status === "success" && (
          <p className="flex w-full items-center gap-2 bg-[#D9EEE1] p-7">
            <CheckCircleIcon
              width={20}
              height={20}
              className="inline-block text-[#04AA6D]"
            />
            {successMsg}
          </p>
        )}
        {status === "error" && (
          <p className="flex w-full items-center gap-2 bg-yellow-200 p-7">
            <CircleAlertIcon width={20} height={20} className="inline-block" />
            Sorry, we could not verify your email. Please check the URL and try
            again.
          </p>
        )}
      </div>
      {status !== "loading" && (
        <div className="mt-5 flex items-center gap-5">
          {status == "success" && (
            <Button
              className="flex-1/2 p-5"
              onClick={() => {
                setEmailVerified(true);
              }}
            >
              Continue Filling your Profile
            </Button>
          )}
          <Link href={"/signin"} className="w-full flex-1/2">
            <Button className="w-full p-5">Go to Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
