"use client";

import React from "react";
import {
  Upload,
  ShieldCheck,
  DollarSign,
  ImageUpscale,
  MessageCircle,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SesameSeed() {
  const router = useRouter();

  const items = [
    {
      icon: ShieldCheck,
      title: "User Logs",
      description: "View and monitor user activity logs across the platform.",
    },
    {
      icon: DollarSign,
      title: "Paystack Logs",
      description: "Track payment transactions and Paystack-related events.",
      action: () => router.push("/sesame-seed/payment-logs"),
    },
    {
      icon: ImageUpscale,
      title: "Edit Stored Images",
      description:
        "Modify existing images in the database, including title and category.",
      action: () => router.push("/dashboard"),
    },
    {
      icon: Upload,
      title: "Upload Images",
      description:
        "Upload new images to the system for processing and storage.",
      action: () => router.push("/sesame-seed/upload"),
      primary: true,
    },
    {
      icon: MessageCircle,
      title: "Messages / Questions",
      description: "View and respond to client questions and support requests.",
      action: () => router.push("/sesame-seed/questions"),
    },
    {
      icon: Mail,
      title: "Newsletter",
      description: "View newsletter subscribers and growth metrics.",
      action: () => router.push("/sesame-seed/newsletter"),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c1d] to-[#151314]">
      {/* Mobile notice */}
      <div className="md:hidden text-sm text-white/60">
        This screen is only accessible on desktop and above
      </div>

      {/* Desktop grid */}
      <TooltipProvider delayDuration={150}>
        <div
          className="hidden md:grid grid-rows-2 grid-flow-col gap-6 p-8 rounded-3xl
            bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    onClick={item.action}
                    className={`group flex items-center justify-center p-6 rounded-2xl cursor-pointer
                      transition-all duration-300 ease-out
                      ${
                        item.primary
                          ? "bg-brand-orange/90 hover:scale-[1.06] hover:shadow-[0_0_50px_rgba(255,140,0,0.45)]"
                          : "bg-[#3A3537]/80 border border-white/10 hover:scale-[1.06] hover:bg-brand-orange/20 hover:shadow-[0_0_40px_rgba(255,140,0,0.25)]"
                      }`}
                  >
                    <Icon
                      className={`w-20 h-20 transition-all duration-300
                        ${
                          item.primary
                            ? "text-black group-hover:scale-110"
                            : "text-white/80 group-hover:text-brand-orange"
                        }`}
                    />
                  </div>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  align="center"
                  className="max-w-[240px] rounded-xl bg-black/90 backdrop-blur
                    border border-white/10 text-white shadow-xl"
                >
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-white/70 mt-1">
                    {item.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
