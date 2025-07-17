"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";
import {
  infoSchema,
  REVERSE_STATUS_MAP,
  STATUS_DISPLAY_MAP,
} from "~/app/schemas/info-schema";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function InfoForm() {
  const { data: personalInfo } = api.user.getPersonalInfo.useQuery();

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      addressLine: "",
      city: "",
      country: "",
      zipCode: "",
      status: "Belum Menikah",
      birthDate: undefined,
      job: "",
      company: "",
    },
  });

  const [showDialog, setShowDialog] = useState(false);

  const updateProfile = api.user.updatePersonalInfo.useMutation({
    onSuccess: () => {
      setShowDialog(true);
    },
    onError: (err) => {
      toast.error("Update personal info failed: " + err.message);
    },
  });

  async function onSubmit(values: z.infer<typeof infoSchema>) {
    console.log("Info Form values:", JSON.stringify(values, null, 2));
    updateProfile.mutate({
      ...values,
      status: REVERSE_STATUS_MAP[values.status]!,
    });
  }

  useEffect(() => {
    if (personalInfo) {
      form.reset({
        name: personalInfo.name ?? undefined,
        phoneNumber: personalInfo.phoneNumber ?? undefined,
        addressLine: personalInfo.addressLine ?? undefined,
        city: personalInfo.city ?? undefined,
        country: personalInfo.country ?? undefined,
        zipCode: personalInfo.zipCode ?? undefined,
        birthDate: personalInfo.birthDate ?? undefined,
        job: personalInfo.job ?? undefined,
        company: personalInfo.company ?? undefined,
        status:
          STATUS_DISPLAY_MAP[personalInfo.status ?? "BELUM_MENIKAH"] ??
          "Belum Menikah",
      });
    }
  }, [personalInfo, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 flex flex-col gap-6"
        id="form"
      >
        <div className="">
          <p className="text-h5 text-[#3A3F63]">INFORMASI PRIBADI</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex w-full flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Nama
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Status
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Belum Menikah">
                            Belum Menikah
                          </SelectItem>
                          <SelectItem value="Menikah">Menikah</SelectItem>
                          <SelectItem value="Cerai">Cerai</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col space-y-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Tanggal Lahir
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Nomor Telepon
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="081231231231" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 flex w-full items-start gap-3 space-y-4">
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Pekerjaan
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Perusahaan
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <p className="text-h5 text-[#3A3F63]">ALAMAT PRIBADI</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex w-full flex-col space-y-4">
              <FormField
                control={form.control}
                name="addressLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Alamat
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Jl. Ganesha No. 1" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Negara
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Indonesia" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col space-y-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Kota
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Bandung" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-b2 text-blacknavy font-normal">
                      Kode Pos
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="31316" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
      <Dialog open={showDialog}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Update Berhasil!</DialogTitle>
            <DialogDescription>
              Personal info anda telah diperbarui!
            </DialogDescription>
          </DialogHeader>
          <Button
            className="text-btn1 rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] py-4 text-center text-white"
            onClick={() => setShowDialog(false)}
          >
            Lanjut
          </Button>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
