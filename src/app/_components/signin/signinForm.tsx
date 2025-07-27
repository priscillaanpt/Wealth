"use client";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { signinSchema } from "~/app/schemas/auth-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircleAlertIcon } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "~/components/trivial/LoadingSpinner";

interface SignInFormProps {
  error: string;
}

const signinErrorMap: Record<string, string> = {
  OAuthAccountNotLinked: "Gmail already registered with other provider!",
  CredentialsSignin: "Invalid credentials",
};

export default function SignInForm({ error }: SignInFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState(signinErrorMap[error]);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setIsLoading(false);
    if (!res?.error) {
      router.push("/info/personal");
    } else {
      setErrorMsg(signinErrorMap[res.error]);
    }
  }

  return (
    <Form {...form}>
      {errorMsg && (
        <p className="w-full bg-red-500 p-4 text-sm text-white">
          <CircleAlertIcon
            width={20}
            height={20}
            className="mr-2 inline-block"
          />
          {errorMsg}
        </p>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Johndoe@example.com"
                  {...field}
                  className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-b1 text-blacknavy">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href={"/forgot-password"}
          className="text-blacknavy mt-3 block text-end font-semibold"
        >
          Forgot Password?
        </Link>
        <Button
          type="submit"
          variant={"default"}
          className="text-btn1 mt-6 min-h-[54px] w-full max-w-[240px] rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] px-8 text-center text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p className="text-btn1">Sign In</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
