import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";
import { forgetFormSchema } from "~/app/schemas/auth-schema";
import LoadingSpinner from "~/components/trivial/LoadingSpinner";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

interface ForgetFormProps {
  setFixedEmail: Dispatch<SetStateAction<string | null>>;
}

export default function ForgetForm({ setFixedEmail }: ForgetFormProps) {
  const form = useForm<z.infer<typeof forgetFormSchema>>({
    resolver: zodResolver(forgetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = api.auth.forgotPassword.useMutation({
    onSuccess: (_,variables) => {
      setIsLoading(false);
      setFixedEmail(variables.email);
    },
    onError: (err) => {
      setIsLoading(false);
      toast.error(err.message)
    },
  });

  async function onSubmit(values: z.infer<typeof forgetFormSchema>) {
    setIsLoading(true)  
    forgotPassword.mutate({
      email: values.email
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button
          type="submit"
          variant={"default"}
          className="text-btn1 min-h-[54px] w-full max-w-[240px] rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] px-8 text-center text-white"
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p className="text-btn1">Kirim</p>
          )}
        </Button>
      </form>
    </Form>
  );
}
