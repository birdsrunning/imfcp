import React from "react";
import GetAccess from "./get-access";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(90vh-64px)] overflow-hidden text-brand-white">
      {/* Decorative brand SVGs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top-left logo */}
        <img
          src="/images/logo/logoOrange.svg"
          alt=""
          className="
            absolute
            -top-24 -left-24
            w-[60%] max-w-none
            opacity-10
            rotate-[-12deg]
          "
        />

        {/* Bottom-right logo */}
        <img
          src="/images/logo/logoOrange.svg"
          alt=""
          className="
            absolute
            -bottom-32 -right-32
            w-[55%] max-w-none
            opacity-10
            rotate-[18deg]
          "
        />
      </div>

      {/* Floating word tags */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <span className="absolute top-24 left-16 text-sm text-brand-white/50">
          Prompt-engineered
        </span>
        <span className="absolute top-48 right-24 text-sm text-brand-white/40">
          Cinematic
        </span>
        <span className="absolute bottom-40 left-32 text-sm text-brand-white/45">
          Commercial-ready
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-28 grid gap-4 grid-cols-1">
        {/* Text + CTA */}
        <div className="max-w-2xl flex flex-col gap-6 justify-center items-center mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Beautiful AI-Generated Images,
            <br className="hidden sm:block" />
            Made for Creatives
          </h1>

          <p className="text-base md:text-lg text-brand-white/70">
            Thousands of expertly generated AI images—carefully curated,
            properly prompted, and delivered in one simple package.
          </p>

          <GetAccess href="/dashboard" />
        </div>

        {/* Product dashboard */}
        <div className="relative z-30 flex justify-center">
          <div className="w-full max-w-6xl transform translate-y-8">
            <div className="rounded-2xl shadow-2xl bg-brand-white/95 backdrop-blur-sm p-4">
              {/* Dashboard image / component */}
              <div className="h-72 sm:h-96 bg-gray-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
