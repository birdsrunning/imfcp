import React from "react";
import GetAccess from "./get-access";
import LightRays from "./LightRays";

const floatingTags = [
  {
    text: "Prompt-engineered",
    className:
      "top-16 left-16 bg-brand-orange/10 text-brand-orange border-brand-orange/30",
  },
  {
    text: "Cinematic",
    className:
      "top-48 right-24 bg-brand-orange/10 text-blue-400 border-blue-400/30",
  },
  {
    text: "Commercial-ready",
    className:
      "bottom-40 left-32 bg-brand-orange/20 text-emerald-400 border-emerald-400/30",
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(90vh-64px)] overflow-hidden text-brand-white">
      {/* Light rays background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#F4683D"
          raysSpeed={1.5}
          lightSpread={0.9}
          rayLength={2.0}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.04}
          className="opacity-100"
        />
      </div>

      {/* Floating text pills */}
      <div className="hidden sm:block absolute inset-0 z-[2] pointer-events-none">
        {floatingTags.map((tag, i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 2}s` }}
            className={`
              absolute ${tag.className}
              px-4 py-1.5 text-sm
              rounded-full
              backdrop-blur-md
              border
              shadow-lg
              animate-float
            `}
          >
            {tag.text}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-[3] mx-auto max-w-7xl px-6 pt-16 grid gap-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
            Beautiful AI-Generated Images,
            <br />
            Made for Creatives
          </h1>

          <p className="text-sm md:text-lg text-brand-white/70">
            Thousands of expertly generated AI images—carefully curated,
            properly prompted, and delivered in one simple package.
          </p>

          <GetAccess href="/dashboard" />
        </div>

        {/* Product dashboard placeholder */}
        <div className="relative z-[4] flex justify-center">
          <div className="w-full max-w-6xl translate-y-8">
            <div className="rounded-2xl shadow-2xl bg-brand-white/95 backdrop-blur-sm p-4">
              <div className="h-72 sm:h-96 bg-gray-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
