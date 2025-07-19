"use client";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { addNewEducation } from "~/app/schemas/education-schema";
import type { Dispatch, SetStateAction } from "react";
import type { AddChildStep } from "./education-plan";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

interface EducationNewChildFormProps {
  setShowAddChildDialog: Dispatch<SetStateAction<AddChildStep>>;
  refetch: () => void;
}

export default function EducationNewChildForm({
  setShowAddChildDialog, refetch
}: EducationNewChildFormProps) {
  const form = useForm<z.infer<typeof addNewEducation>>({
    resolver: zodResolver(addNewEducation),
    defaultValues: {
      childName: "",
      birthDate: undefined,
      fundAllocated: 0,
    },
  });

  const addChildPlan = api.education.addChildEducationPlan.useMutation({
    onSuccess: () => {
      setShowAddChildDialog("succeed");
      refetch()
    },
    onError: (err) => {
      toast.error("Error adding new child: " + err.message);
    },
  });

  async function onSubmit(values: z.infer<typeof addNewEducation>) {
    addChildPlan.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 flex flex-col gap-6"
      >
        <div className="flex w-full flex-col space-y-4">
          <FormField
            control={form.control}
            name="childName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-b2 text-blacknavy font-normal">
                  Nama Anak
                </FormLabel>
                <FormControl>
                  <Input placeholder="Matthew Vladimir Hutabalat" {...field} />
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
        </div>
        <div className="col-span-2 flex w-full items-start gap-3 space-y-4">
          <FormField
            control={form.control}
            name="fundAllocated"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-b2 text-blacknavy font-normal">
                  Tabungan Pendidikan anak Anda
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button className="text-btn1 rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] py-4 text-center text-white">Tambah</Button>
      </form>
    </Form>
  );
}
