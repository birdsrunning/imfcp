import React from "react";
import { freemiumOfferings, premiumOfferings } from "@/data/data";
import { Check } from "lucide-react";
import GetAccess from "../get-access";
import { Button } from "../ui/button";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="flex flex-col md:flex-row gap-4 max-w-5xl items-center">
        {/* ================= Freemium ================= */}
        <div
          className="relative rounded-tl-2xl rounded-tr-none rounded-br-none rounded-bl-2xl p-[1px]
                       backdrop-blur-xl max-w-80 "
        >
          {/* Inner — NOT glass */}
          <div
            className="rounded-3xl bg-background p-8
                          border border-white/10
                          flex flex-col gap-6"
          >
            {/* header */}
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                Starter{" "}
                <span className="text-muted-foreground">(Freemium)</span>
              </h2>
            </div>

            {/* price */}
            <p className="text-4xl font-bold">
              ₦0
              <span className="text-sm font-light ml-1">NGN</span>
            </p>

            {/* description */}
            <p className="text-sm text-muted-foreground">
              Perfect for new creatives testing the waters before committing.
            </p>

            {/* offerings */}
            <div className="flex flex-col gap-3">
              {freemiumOfferings.map((offering, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="bg-brand-orange/20 text-brand-orange rounded-md p-1">
                    <Check size={14} />
                  </span>
                  <p className="text-sm">{offering}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <GetAccess href="/get-access" />
          </div>
        </div>

        {/* ================= Premium ================= */}
        <div
          className="relative rounded-3xl p-[1px]
                        bg-gradient-to-br from-brand-orange via-brand-orange to-brand-white
                        shadow-[0_0_70px_rgba(244,104,61,0.45)] scale-[1.03]"
        >
          {/* Glass orange background */}
          <div
            className="rounded-3xl p-8 flex flex-col gap-6
                          bg-brand-orange/20 backdrop-blur-2xl
                          border border-brand-white/30"
          >
            {/* badge */}
            <span
              className="w-fit text-xs font-medium px-3 py-1 rounded-full
                             bg-brand-orange text-brand-black"
            >
              Most Popular
            </span>

            {/* header */}
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-white">Premium</h2>
            </div>

            {/* price */}
            <p className="text-4xl font-bold text-white">
              ₦10,000{/* insert price */}
              <span className="text-sm font-light ml-1">NGN</span>
            </p>

            {/* description */}
            <p className="text-sm text-brand-white/80">
              Built for professionals who need speed, quality, and scale.
            </p>

            {/* offerings */}
            <div className="flex flex-col gap-3">
              {premiumOfferings.map((offering, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="bg-brand-white text-brand-orange rounded-md p-1">
                    <Check size={14} />
                  </span>
                  <p className="text-sm text-white">{offering}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button className="mt-2 bg-brand-white text-brand-orange rounded-2xl hover:bg-brand-white/90">
              Get access and upgrade to Premium
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
