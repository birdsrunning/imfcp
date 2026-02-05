"use client";

import Image from "next/image";

type PersonaCardProps = {
  title: string;
  description: string;
  icon: string;
  image: string;
};

export default function PersonaCard({
  title,
  description,
  icon,
  image,
}: PersonaCardProps) {
  return (
    <div className="relative min-h-96 rounded-2xl shadow-lg overflow-hidden group">
      <Image
        fill
        src={image}
        alt={title}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover opacity-10 group-hover:opacity-90 transition-all duration-300"
      />

      <div
        className="relative z-10 min-h-96 p-6 flex flex-col justify-end"
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
