"use client";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { infoFormSchema } from "~/app/schemas/auth-schema";
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
import { CircleAlertIcon } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "~/components/trivial/LoadingSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import Link from "next/link";
import { api } from "~/trpc/react";

interface UserInfoFormProps {
  token: string;
}

export default function UserInfoForm({ token }: UserInfoFormProps) {
  const form = useForm<z.infer<typeof infoFormSchema>>({
    resolver: zodResolver(infoFormSchema),
    defaultValues: {
      name: "",
      job: "",
      company: "",
      country: "",
      city: "",
      zipCode: "",
    },
  });

  const updateInfo = api.user.updateBasicInfo.useMutation({
    onSuccess: () => {
      setIsLoading(false);
      setShowDialog(true);
    },
    onError: (error) => {
      setIsLoading(false);
      setErrorMsg(error.message);
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  async function onSubmit(values: z.infer<typeof infoFormSchema>) {
    setIsLoading(true);
    updateInfo.mutate({
      token,
      ...values,
    });
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
          name="name"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">
                Nama Lengkap
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
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
          name="job"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">
                Pekerjaan
              </FormLabel>
              <FormControl>
                <Input
                  className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">
                Perusahaan
              </FormLabel>
              <FormControl>
                <Input
                  className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel className="text-b1 text-blacknavy">Negara</FormLabel>
              <FormControl>
                <Input
                  className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-b1 text-blacknavy">Kota</FormLabel>
                <FormControl>
                  <Input
                    className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-b1 text-blacknavy">
                  Kode Pos
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="XXXXX"
                    className="min-h-[45px] max-w-[620px] rounded-lg border-1 border-[#d9e1ec]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button
            type="submit"
            variant={"default"}
            className="text-btn1 min-h-[54px] w-full max-w-[240px] rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] px-8 text-center text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <p className="text-btn1">Konfirmasi</p>
            )}
          </Button>
          <Button onClick={() => setShowDialog(true)} variant={"link"}>
            Lewati
          </Button>
        </div>
      </form>
      <Dialog open={showDialog}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Akun Anda telah dibuat!</DialogTitle>
            <DialogDescription>
              Apakah anda siap untuk mengelola kekayaan Anda sendiri?
            </DialogDescription>
          </DialogHeader>
          <Button
            asChild
            className="text-btn1 rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] py-4 text-center text-white"
          >
            <Link href={"/signin"}>Lanjut</Link>
          </Button>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
