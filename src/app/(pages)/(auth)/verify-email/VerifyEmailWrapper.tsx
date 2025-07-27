"use client";

import { useState } from "react";
import UserInfoForm from "~/components/auth/verify-email/UserInfoForm";
import VerifyEmailNotice from "~/components/auth/verify-email/VerifyEmailNotice";

interface VerifyEmailWrapperProps {
  token: string;
}

const VerifyEmailWrapper = ({ token }: VerifyEmailWrapperProps) => {
  const [emailVerified, setEmailVerified] = useState(false);

  return (
    <>
      {emailVerified ? (
        <div className="w-1/2">
          <div className="mb-6">
            <h1 className="text-h1 text-blacknavy">INFORMASI ANDA</h1>
            <p className="text-b1 text-whitenavy">
              Harap Lengkapi Informasi Anda
            </p>
          </div>
          <UserInfoForm token={token} />
        </div>
      ) : (
        <VerifyEmailNotice token={token} setEmailVerified={setEmailVerified} />
      )}
    </>
  );
};

export default VerifyEmailWrapper;
