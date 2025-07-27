"use client";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { educationSchema } from "~/app/schemas/education-schema";
import EducationStageTable from "./education-stage-table";
import toast from "react-hot-toast";
import { EducationChart } from "./education-chart";

interface EducationFormProps {
  childId: string;
  refetchChildList: () => void;
}

export default function EducationForm({
  childId,
  refetchChildList,
}: EducationFormProps) {
  const { data: childInfo, refetch } =
    api.education.getChildEducationPlan.useQuery({
      childId,
    });

  let fundAllocated = childInfo?.fundAllocated ?? 0;
  const chartData = childInfo?.educationStages.map((stage) => {
    const totalCost =
      stage.costBeforeInflation * (1 + stage.inflationRate / 100);
    const stageFundAllocated =
      fundAllocated >= totalCost ? totalCost : fundAllocated;
    fundAllocated -= stageFundAllocated;
    return {
      parentAge: stage.parentAge,
      childAge: stage.childAge,
      stageName: stage.stageName,
      cost: totalCost,
      fundAllocated: stageFundAllocated,
    };
  });

  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      childName: "",
      birthDate: undefined,
      fundAllocated: 0,
      stages: [],
    },
  });

  const [showDialog, setShowDialog] = useState(false);
  const { fields } = useFieldArray({ name: "stages", control: form.control });

  const updateEducationPlan =
    api.education.updateChildEducationPlan.useMutation({
      onSuccess: () => {
        setShowDialog(true);
        refetchChildList();
        void refetch();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  async function onSubmit(values: z.infer<typeof educationSchema>) {
    const valuesWithChildId = { ...values, childId };
    updateEducationPlan.mutate(valuesWithChildId);
  }

  useEffect(() => {
    if (childInfo) {
      form.reset({
        childName: childInfo.childName ?? undefined,
        birthDate: childInfo.birthDate ?? undefined,
        fundAllocated: childInfo.fundAllocated ?? undefined,
        stages: childInfo.educationStages ?? [],
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childInfo]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-2 flex flex-col gap-6 px-6"
          id="form"
        >
          <div className="mt-4 grid grid-cols-2 gap-3">
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
                      <Input
                        placeholder="Matthew Vladimir Hutabalat"
                        {...field}
                      />
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
                      Tabungan Pendidikan anak Anda saat ini
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <EducationStageTable control={form.control} fields={fields} />
        </form>
        <Dialog open={showDialog}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Update Berhasil!</DialogTitle>
              <DialogDescription>
                Rencana pendidikan anak Anda berhasil diperbarui!
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
      <div className="h-8 bg-[#F5F6FA]" />
      <EducationChart chartData={chartData ?? []} />
    </>
  );
}
