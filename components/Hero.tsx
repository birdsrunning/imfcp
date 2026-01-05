import React from "react";
import GetAccess from "./get-access";
import { Menu } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] overflow-hidden text-brand-white">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img className="w-full h-full"  src="/images/2.svg"/>
      </div>

      {/* Floating word tags */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <span className="absolute top-20 left-10 text-sm text-blue-500 opacity-60">
          Analytics
        </span>
        <span className="absolute top-40 right-20 text-sm text-green-500 opacity-60">
          Growth
        </span>
        <span className="absolute bottom-32 left-32 text-sm text-purple-500 opacity-60">
          Automation
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 pt-24 grid gap-12 grid-cols-1 items-center">
        {/* Text + CTA */}
        <div className="max-w-2xl flex flex-col gap-4 justify-center items-center mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center">
            Beautiful AI-Generated Images, Made for Creatives
          </h1>

          <p className="mt-4 text-base text-center md:text-lg text-brand-white/65">
            One dashboard to track growth, performance, and decisions in real
            time.
          </p>

          <GetAccess href="/dashboard" />
        </div>

        {/* Product dashboard */}
        <div className="relative z-30 flex justify-center">
          <div className="w-full max-w-7xl transform translate-y-6">
            <div className="rounded-xl shadow-2xl bg-brand-white p-4">
              {/* Dashboard image / component */}
              <div className="h-72 sm:h-96 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
