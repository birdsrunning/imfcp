"use client";

import React from "react";
import Image from "next/image";

export default function PersonaCard({
  title,
  description,
  icon,
  image,
}: {
  title: string;
  description: string;
  icon: string;
  image: string;
}) {
  return (
    <div className="relative min-h-96 rounded-2xl shadow-lg group overflow-hidden">
      <Image
        fill
        src={image}
        alt={title}
        className="object-cover object-center rounded-2xl opacity-10 group-hover:opacity-90 transition-all duration-300"
      />

      {/* Overlay */}
      <div
        className="relative z-10 min-h-96 p-6 rounded-2xl flex flex-col justify-end"
        style={{
          background:
            "linear-gradient(to top, rgba(244,104,61,0.80), rgba(244,104,61,0))",
        }}
      >
        <div className="text-[#EAE8E8]">
          <div className="text-2xl">{icon}</div>
          <h3 className="mt-4 text-lg font-medium">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
