"use client";
import React from "react";
import { Upload, ShieldCheck, DollarSign, ImageUpscale } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SesameSeed() {
  const router = useRouter();

  return (
    <div className="min-h-screen ">
      <div className="flex gap-8 justify-between m-auto max-w-[">
        <div className="bg-[#3A3537] p-4 rounded-2xl cursor-pointer">
          <ShieldCheck className="w-24 h-24 " />
        </div>

        <div className="bg-[#3A3537] p-4 rounded-2xl cursor-pointer">
          <DollarSign className="w-24 h-24" />
        </div>

        <div className="bg-[#3A3537] p-4 rounded-2xl cursor-pointer">
          <ImageUpscale className="w-24 h-24" />
        </div>

        <div className="bg-[#3A3537] p-4 rounded-2xl cursor-pointer">
          <Upload
            className="w-24 h-24"
            onClick={() => {
              router.push("/sesame-seed/upload");
            }}
          />
        </div>

      </div>
    </div>
  );
}
