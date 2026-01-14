import React from "react";
import GetAccess from "./get-access";
import LightRays from "./LightRays";

const floatingImages = [
  {
    src: "/images/korty_eo.jpg",
    className: "top-16 left-16 w-16 rotate-[-6deg]",
  },
  {
    src: "/images/korty_eo.jpg",
    className: "top-56 right-24 w-20 rotate-[4deg]",
  },
  {
    src: "/images/korty_eo.jpg",
    className: "bottom-40 left-32 w-14 rotate-[-2deg]",
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
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.04}
          className="opacity-100"
        />
      </div>

      {/* Dark contrast overlay */}
      {/* <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/80" /> */}

      {/* Floating word tags */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <span className="absolute top-14 left-16 text-sm text-brand-white/50">
          Prompt-engineered
        </span>
        <span className="absolute top-48 right-24 text-sm text-brand-white/40">
          Cinematic
        </span>
        <span className="absolute bottom-40 left-32 text-sm text-brand-white/45">
          Commercial-ready
        </span>
      </div>

      {/* Floating image accents */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {floatingImages.map((img, i) => (
          <div
            style={{ animationDelay: `${i * 2}s` }}
            key={i}
            className={`absolute ${img.className} animate-float`}
          >
            <img
              src={img.src}
              alt=""
              className="
          rounded-xl
          opacity-70
          shadow-xl
          backdrop-blur-sm
          border border-white/10
        "
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-[3] mx-auto max-w-7xl px-6 pt-16 grid gap-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center">
          <h1 className="text-3xl md:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Beautiful AI-Generated Images,
            <br className="" />
            Made for Creatives
          </h1>

          <p className="text-sm md:text-lg text-brand-white/70">
            Thousands of expertly generated AI images—carefully curated,
            properly prompted, and delivered in one simple package.
          </p>

          <GetAccess href="/dashboard" />
        </div>

        {/* Product dashboard */}
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
