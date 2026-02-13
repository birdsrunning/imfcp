"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type RevealImageProps = {
  src: string;
  alt?: string;
};

export function RevealImage({ src, alt }: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0 0"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"]
  );

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="w-full flex justify-center">
      <div
        ref={ref}
        className="
          relative
          w-[min(420px,85vw)]
          aspect-[4/5]
          overflow-hidden
          rounded-2xl
        "
      >
        <motion.img
          src={src}
          alt={alt}
          style={{
            clipPath,
            y,
            willChange: "clip-path, transform",
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
