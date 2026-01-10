import React from "react";
import PersonaCard from "./PersonaCard";
import { personas } from "@/data/data";

export default function PersonaSection() {
  return (
    <section className="py-6 flex flex-col gap-8">
      <div className="md:max-w-4xl max-w-2xl mx-auto p-6">
        <h2>Who this is for</h2>

        <p className="lead text-2xl leading-[200%]">
          We believe in a creator-first approach to visual resources, using
          carefully curated images and modern tools. Together, we can build
          better creative work today and shape the visuals of tomorrow.
        </p>
      </div>

      {/* cards */}
      <div className="relative w-full grid sm:grid-cols-3 grid-cols-1 items-center gap-4 px-6">
        <PersonaCard
          title="Creators"
          description="Designers, filmmakers, and artists building visual-first work."
          icon="🎨"
          image={personas[0].image}
        />
        <PersonaCard
          title="Teams"
          description="Product and marketing teams shipping faster together."
          icon="👥"
          image={personas[0].image}
        />
        <PersonaCard
          title="Founders"
          description="Builders shaping ideas into scalable products."
          icon="🚀"
          image={personas[0].image}
        />
      </div>
    </section>
  );
}
