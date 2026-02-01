"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PersonaCard from "./PersonaCard";
import { personas } from "@/data/data";

/* ---------------- Utils ---------------- */
function getRandomItemsNoRepeat<T>(
  array: T[],
  count: number,
  previous: T[] = []
): T[] {
  const available =
    previous.length === 0
      ? array
      : array.filter((item) => !previous.includes(item));

  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/* --------------- Component -------------- */
export default function PersonaSection() {
  // Deterministic initial render (SSR-safe)
  const [current, setCurrent] = useState<typeof personas>(
    personas.slice(0, 3)
  );

  // Keep previous value WITHOUT triggering re-renders
  const previousRef = useRef<typeof personas>(current);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getRandomItemsNoRepeat(
        personas,
        3,
        previousRef.current
      );

      previousRef.current = next;
      setCurrent(next);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 flex flex-col gap-8">
      {/* Header */}
      <div className="md:max-w-4xl max-w-2xl mx-auto p-6">
        <h2 className="font-bold underline">Who this is for?</h2>

        <p className="text-2xl leading-[200%]">
          We believe in a creator-first approach to visual resources,
          <span className="font-light opacity-70">
            {" "}
            together shaping the visuals of tomorrow.
          </span>
        </p>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.map((p) => p.title).join("-")}
          className="grid sm:grid-cols-3 grid-cols-1 gap-4 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {current.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
            >
              <PersonaCard {...persona} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
