"use client";

import React from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

interface OauthButtonProps {
  provider: string;
  iconSrc: string;
  text: string;
}

const OauthButton = ({ provider, iconSrc, text }: OauthButtonProps) => {
  const onClickSignIn = async () => {
    await signIn(provider, {
      redirectTo: "/info/personal",
    });
  };
  return (
    <Button
      className="flex items-center justify-center rounded-xl bg-white py-6 text-black transition duration-100 ease-in-out hover:cursor-pointer hover:bg-gray-100 hover:shadow-xl"
      onClick={onClickSignIn}
    >
      <Image src={iconSrc} width={30} height={30} alt="oauth-icon" />
      {text}
    </Button>
  );
};

export default OauthButton;
