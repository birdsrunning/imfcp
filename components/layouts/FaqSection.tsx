import React from "react";
import FaqCard from "../FaqCard";

const FAQS = [
  {
    question: "What type of images do you provide?",
    answer:
      "We provide high-quality, AI-generated images optimized for marketing, branding, and creative workflows. All images are delivered in multiple formats and resolutions.",
  },
  {
    question: "Can I use the images for commercial projects?",
    answer:
      "Yes. All images come with a commercial-use license, allowing you to use them in client work, advertising, websites, and social media.",
  },
  {
    question: "How fast is image delivery?",
    answer:
      "Images are generated and delivered instantly after purchase, with no waiting time or manual approval required.",
  },
  {
    question: "Do you offer custom image requests?",
    answer:
      "Absolutely. You can request custom styles, compositions, or concepts tailored specifically to your brand or project.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-brand-orange relative rounded-2xl px-6 py-12 md:px-10 md:py-16">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img className="w-full h-full" src="/images/2.svg" />
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left content */}
        <div className="flex flex-col justify-center">
          <span className="mb-3 text-sm font-medium uppercase tracking-wide text-black/70">
            FAQ
          </span>

          <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
            Frequently asked questions
          </h2>

          <p className="mt-4 max-w-md text-black/70 text-base leading-relaxed">
            Everything you need to know about our image delivery, licensing, and
            customization options. If you can’t find your answer here, feel free
            to reach out.
          </p>
        </div>

        {/* Right content */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}