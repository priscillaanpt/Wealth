import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  changePasswordFormSchema,
} from "~/app/schemas/auth-schema";
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

export default function ChangePasswordForm() {
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type="password"
                  className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="******"
                  type="password"
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
          <p className="text-btn1">Reset</p>
        </Button>
      </form>
    </Form>
  );
}
