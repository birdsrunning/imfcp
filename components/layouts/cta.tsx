import React from "react";

export default function CtaSection() {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/50 via-white/10 to-white/40 shadow-[0_0_40px_rgba(255,255,255,0.08)] max-w-7xl lg:mx-auto mx-6 my-12">
      <section
        className="
          relative h-fit rounded-2xl overflow-hidden
          bg-[radial-gradient(140%_140%_at_85%_85%,#ff6a3d_0%,rgba(255,106,61,0.85)_30%,rgba(255,106,61,0.4)_45%,transparent_65%),radial-gradient(120%_120%_at_20%_80%,#ffd6c9_0%,rgba(255,214,201,0.85)_25%,transparent_60%),linear-gradient(135deg,#140b0a_0%,#4a1f16_30%,#ff6a3d_65%,#ff8a5c_100%)]
          px-6 py-20 md:px-14 md:py-28
        "
      >
        {/* Decorative layer (SVGs / floating tags live here) */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          {/* svg patterns / floating tags */}
        </div>

        {/* Content */}
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
            <button className="
              rounded-full bg-white px-8 py-4 text-base font-medium text-[#140b0a]
              shadow-lg shadow-black/10
              transition-all duration-300
              hover:scale-[1.03]
              hover:shadow-xl
              active:scale-[0.98]
            ">
              Get Lifetime Access
            </button>

            {/* Micro reassurance */}
            <span className="text-sm text-white/70">
              One-time purchase • Unlimited use • No subscriptions
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
