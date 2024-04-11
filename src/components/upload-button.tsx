"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const UploadButton = () => {
  const [isOpen, setIsOpne] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpne(v);
        }
      }}>
      <DialogTrigger onClick={() => setIsOpne(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default UploadButton;
