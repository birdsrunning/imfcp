"use client";

import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type PlanType = "free" | "paid" | undefined;

export default function PlanBoard({ plan }: { plan: PlanType }) {
  const isFree = !plan || plan === "free";

  // intentionally aspirational
  const used = isFree ? 20 : 500;
  const premiumLimit = 500;

  const router = useRouter();

  return (
    <div
      className="
    rounded-2xl
    bg-white/10
    backdrop-blur-xl
    border border-white/15
    shadow-lg
    p-4 
    flex flex-col gap-4
  "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-white/60">
          Plan usage
        </p>

        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full
            ${
              isFree
                ? "bg-white/10 text-white/70"
                : "bg-orange-500/20 text-orange-400"
            }
          `}
        >
          {isFree ? "Free" : "Premium"}
        </span>
      </div>

      {/* Usage */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-white">
          {used}
          <span className="text-white/50 font-normal">
            {" "}
            / {premiumLimit} images
          </span>
        </p>

        <ProgressBar current={used} total={premiumLimit} />

        {isFree && (
          <p className="text-[11px] text-white/50 leading-snug">
            Premium unlocks up to{" "}
            <span className="text-white/80 font-medium">
              {premiumLimit} images
            </span>
          </p>
        )}
      </div>

      {/* CTA */}
      {isFree && (
        <Button
          size="sm"
          className="
            mt-2
            bg-gradient-to-r from-orange-400 to-orange-600
            text-white
            hover:opacity-90
          "
          onClick={() => {
            router.push("/checkout");
          }}
        >
          Upgrade to Premium
        </Button>
      )}
    </div>
  );
}
