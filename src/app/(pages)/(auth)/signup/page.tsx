"use client";

import { useState } from "react";
import CheckEmailNotice from "~/app/_components/signup/checkEmailNotice";
import SignUpForm from "~/app/_components/signup/signupForm";
import OauthButton from "~/components/auth/signIn/oauth-button";

const SignUp = () => {
  const [emailFixed, setEmailFixed] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const checkEmailState = emailFixed && userId;
  return (
    <div className="w-1/2">
      <div className="mb-4">
        <h1 className="text-h1 text-blacknavy">
          {checkEmailState ? "CHECK YOUR EMAIL" : "CREATE AN ACCOUNT"}
        </h1>
        <p className="text-b1 text-whitenavy">
          {checkEmailState
            ? `We have sent an email regarding verification instruction`
            : "Create your account to start managing your wealth"}
        </p>
      </div>

      {checkEmailState ? (
        <CheckEmailNotice
          intervalSeconds={30}
          emailFixed={emailFixed}
          userId={userId}
        />
      ) : (
        <div>
          <SignUpForm setEmailFixed={setEmailFixed} setUserId={setUserId} />
          <div className="mt-5 mb-3 flex w-full items-center">
            <p className="px-4 text-sm text-gray-500">
              or create an account using
            </p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div>
            <OauthButton
              provider="google"
              iconSrc="/images/auth/google.svg"
              text="Google"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;