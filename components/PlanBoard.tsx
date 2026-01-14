"use client";
import React from "react";
import ProgressBar from "./ProgressBar";
type PlanType = "free" | "paid";
import { Button } from "./ui/button";

export default function PlanBoard({ plan }: { plan: PlanType }) {
  const totalFromPlan = (plan: PlanType): number => {
    if (plan === "free") {
      return 20;
    } else {
      return 500;
    }
  };
  return (
    <div
      className="
  rounded-2xl
  bg-white/10
  backdrop-blur-xl
  border border-white/20
  shadow-lg
  p-6
"
    >
      <div className="flex justify-between">
        <p>Plan Usage</p>
        <p>Standard</p>
      </div>
      {/* total images */}
      <div>
        <p>
          {totalFromPlan(plan)} <span>/500 images</span>
        </p>
        <ProgressBar current={totalFromPlan(plan)} total={500} />
      </div>

      {/* upgrade to premium button */}
      <Button>Upgrade to premium</Button>
    </div>
  );
}
