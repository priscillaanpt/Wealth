"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface CheckEmailProps {
  intervalSeconds: number;
  emailFixed: string;
  userId: string;
}

export default function CheckEmailNotice({
  intervalSeconds,
  emailFixed,
  userId,
}: CheckEmailProps) {
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  const resendEmail = api.auth.sendEmail.useMutation({
    onSuccess: () => {
      setSecondsLeft(intervalSeconds);
    },
    onError: (error) => {
      console.log("Error resending email: ", error.message);
    },
  });

  const handleResend = () => {
    if (secondsLeft > 0) {
      return;
    }

    resendEmail.mutate({
      targetEmail: emailFixed,
      userId,
      type: "EMAIL_VERIFICATION",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <>
      <p className="flex w-full items-center gap-4 bg-[#D9EEE1] p-7">
        <CheckCircleIcon
          width={20}
          height={20}
          className="inline-block text-[#04AA6D]"
        />
        Check your email & click the link to <br />
        activate your account.
      </p>
      <div className="flex w-full items-center gap-5 mt-5">
        <Button
          className="flex-1 bg-blue-900 hover:bg-blue-500"
          disabled={secondsLeft > 0}
          onClick={handleResend}
        >
          Resend Email
        </Button>
        <Button className="flex-1 border-2 border-gray-400 bg-transparent text-black hover:text-white">
          Contact Support
        </Button>
      </div>
    </>
  );
}
