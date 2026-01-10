import React from "react";
import TestimonialCards from "../TestimonialCards";

export default function Testimonials() {
  return (
    <section className="mx-auto flex flex-col gap-8 p-6">
      <h2 className="text-3xl mx-auto w-fit">See what our users say</h2>
      <TestimonialCards />
    </section>
  );
}
