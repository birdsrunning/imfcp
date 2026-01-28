"use client";

import React, { useRef } from "react";
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
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className="relative min-h-96 rounded-2xl shadow-lg group transition-all duration-300"
    >
      <Image
        fill
        src={image}
        alt={title}
        className="object-cover object-center rounded-2xl opacity-10 group-hover:opacity-90 transition-all duration-300"
      />

      {/* Overlay */}
     <div
  className="relative z-10 min-h-96 p-6 rounded-2xl"
  style={{
    background: "linear-gradient(to top, rgba(244,104,61,0.80), rgba(244,104,61,0))",
  }}
>
  <div className="sticky top-[70%] text-[#EAE8E8]">
    <div className="text-2xl">{icon}</div>
    <h3 className="mt-4 text-lg font-medium">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed">{description}</p>
  </div>
</div>
    </div>
  );
}

// import React from "react";
// import Image from "next/image";

// export default function PersonaCard({
//   title,
//   description,
//   icon,
//   image,
// }: {
//   title: string;
//   description: string;
//   icon: string;
//   image: string;
// }) {
//   return (
//     <div
//       className="relative min-h-96 rounded-2xl border-[1px] border-[#F4683D] shadow-lg"
//     >
//       <Image
//         fill
//         src={image}
//         alt={title}
//         className="object-cover object-center group-hover:scale-110 transition-transform duration-300 rounded-2xl"
//       />

//       {/* Orange tint overlay */}
//       <div className="absolute inset-0  bg-gradient-to-t from-[#F4683D]/80 to-transparent p-6 rounded-2xl">
//         <div className="sticky top-[70%]">
//           <div className="text-2xl">{icon}</div>
//           <h3 className="mt-4 text-lg font-medium">{title}</h3>
//           <p className="mt-2 text-sm leading-relaxed">{description}</p>
//         </div>
//       </div>

//       {/* Card content at bottom */}
//     </div>
//   );
// }
