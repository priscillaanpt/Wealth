"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import EducationForm from "./education-form";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import EducationNewChildForm from "./education-new-child-form";
import Image from "next/image";
import EducationTotalBanner from "./education-total";

export type AddChildStep = "closed" | "opened" | "succeed";

const EducationPlan = () => {
  const { data: childrenInfo, refetch } =
    api.education.getChildEducationPlanIdList.useQuery();

  const [currentChildId, setCurrentChildId] = useState<string | undefined>(
    undefined,
  );

  const [showAddChildDialog, setShowAddChildDialog] =
    useState<AddChildStep>("closed");

  useEffect(() => {
    const firstChild =
      childrenInfo?.childList && childrenInfo?.childList.length > 0
        ? childrenInfo?.childList[0]?.id
        : null;
    if (firstChild) {
      setCurrentChildId(firstChild);
    }
  }, [childrenInfo]);

  return (
    <>
      <EducationTotalBanner totalCost={childrenInfo?.totalCost ?? 0} />

      <div className="rounded-lg bg-white py-6">
        <Select value={currentChildId} onValueChange={setCurrentChildId}>
          <SelectTrigger className="text-h5 text-blacknavy font-rubik w-full border-0 font-bold">
            <SelectValue placeholder="Child's Education Plan" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {childrenInfo?.childList?.map((child) => (
                <SelectItem
                  key={child.id}
                  value={child.id}
                  className="text-h5 text-blacknavy font-rubik"
                >
                  <Image
                    src={"/images/info/baby.png"}
                    alt="child-icon"
                    width={30}
                    height={30}
                  />
                  RENCANA PENDIDIKAN {child.childName.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
            <Button
              onClick={() => setShowAddChildDialog("opened")}
              variant={"outline"}
              className="mx-auto block border-0"
            >
              <Plus />
            </Button>
          </SelectContent>
        </Select>
        {currentChildId && (
          <EducationForm childId={currentChildId} refetchChildList={refetch} />
        )}
        <Dialog open={showAddChildDialog !== "closed"}>
          <DialogContent
            showCloseButton={false}
            onInteractOutside={() => setShowAddChildDialog("closed")}
          >
            {showAddChildDialog === "succeed" ? (
              <>
                <DialogHeader>
                  <DialogTitle>
                    Penambahan Rencana Pendidikan berhasil!
                  </DialogTitle>
                  <DialogDescription>
                    Penambahan rencana berhasil, anda dapat melanjutkan
                    perencanaa pendidikan anak anda!
                  </DialogDescription>
                </DialogHeader>
                <Button
                  className="text-btn1 rounded-full bg-[#4B5EFF] bg-gradient-to-tr from-[#4F8AFF] to-[#4B5EFF] py-4 text-center text-white"
                  onClick={() => setShowAddChildDialog("closed")}
                >
                  Lanjut
                </Button>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Tambah Rencana Pendidikan Anak</DialogTitle>
                  <DialogDescription>
                    Tambah rencana pendidikan untuk anak anda agar anda dapat
                    memperkirakan biaya dengan lebih baik!
                  </DialogDescription>
                </DialogHeader>
                <EducationNewChildForm
                  setShowAddChildDialog={setShowAddChildDialog}
                  refetch={() => refetch()}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EducationPlan;
