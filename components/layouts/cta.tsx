"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const floatingTags = [
  { text: "Prompt-Ready", className: "top-10 left-12 bg-[#ff6a3d]" },
  { text: "Commercial-Use", className: "top-32 right-16 bg-[#ff9a5c]" },
  { text: "High-Res", className: "bottom-16 left-24 bg-[#ffd6c9]" },
  { text: "Unlimited Access", className: "bottom-28 right-12 bg-[#ff8a5c]" },
  { text: "Curated Quality", className: "top-20 right-32 bg-[#ffb69c]" },
];

export default function CtaSection() {
  const router = useRouter();
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/50 via-white/10 to-white/40 shadow-[0_0_40px_rgba(255,255,255,0.08)] w-full max-w-7xl mx-6 my-12">
      <section
        className="
          relative h-fit rounded-2xl overflow-hidden
          bg-[radial-gradient(140%_140%_at_85%_85%,#ff6a3d_0%,rgba(255,106,61,0.85)_30%,rgba(255,106,61,0.4)_45%,transparent_65%),radial-gradient(120%_120%_at_20%_80%,#ffd6c9_0%,rgba(255,214,201,0.85)_25%,transparent_60%),linear-gradient(135deg,#140b0a_0%,#4a1f16_30%,#ff6a3d_65%,#ff8a5c_100%)]
          px-6 py-20 md:px-14 md:py-28
        "
      >
        {/* Floating pill tags using Framer Motion */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {floatingTags.map((tag, i) => (
            <motion.span
              key={i}
              className={`absolute ${tag.className} text-sm text-white px-4 py-1 rounded-full shadow-lg shadow-black/20`}
              animate={{
                y: [0, -6, 0], // subtle vertical float
                rotate: [0, 1, 0], // tiny rotation
              }}
              transition={{
                duration: 6 + 0.9 * 2, // slight variation in speed
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5, // stagger start times
              }}
            >
              {tag.text}
            </motion.span>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
            AI Images, Done Once—For Everything You’ll Ever Build.
          </h2>

          <p className="text-base md:text-lg text-white/85 max-w-2xl">
            We’ve already done the hard part: prompt engineering, curation, and
            scale. You get thousands of high-quality images in one simple,
            pay-once package.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 mt-4">
            <button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="
              rounded-full bg-white px-8 py-4 text-base font-medium text-[#140b0a]
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:scale-[1.03]
              hover:shadow-xl
              active:scale-[0.98]
            "
            >
              Get Lifetime Access
            </button>

            <span className="text-sm text-white/70">
              One-time purchase • Unlimited use • No subscriptions
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
