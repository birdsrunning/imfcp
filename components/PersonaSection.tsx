"use client";

import React, { useState, useEffect } from "react";
import PersonaCard from "./PersonaCard";
import { personas } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";

// utils/random.ts
export function getRandomItemsNoRepeat<T>(
  array: T[],
  count: number,
  previous: T[] = []
): T[] {
  const available = array.filter((item) => !previous.includes(item));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function PersonaSection() {
  const [selectedPersonas, setSelectedPersonas] = useState(() =>
    getRandomItemsNoRepeat(personas, 3)
  );
  const [previousPersonas, setPreviousPersonas] = useState(selectedPersonas);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getRandomItemsNoRepeat(personas, 3, previousPersonas);
      setSelectedPersonas(next);
      setPreviousPersonas(next);
    }, 5000); // rotate every 2.5s

    return () => clearInterval(interval);
  }, [previousPersonas]);

  return (
    <section className="py-6 flex flex-col gap-8">
      <div className="md:max-w-4xl max-w-2xl mx-auto p-6">
        <h2 className="font-bold underline">Who this is for?</h2>

        <p className="lead text-2xl leading-[200%]">
          <span>We believe in a creator-first approach to visual resources,</span>{" "}
          using carefully curated images{" "}
          <span className="font-light opacity-70">
            Together, we can build better creative work today and shape the visuals of tomorrow.
          </span>
        </p>
      </div>

      {/* Persona cards */}
      <div className="relative w-full grid sm:grid-cols-3 grid-cols-1 items-center gap-4 px-6">
        {/* AnimatePresence with mode="wait" ensures exit completes before enter */}
        <AnimatePresence mode="wait">
          {selectedPersonas.map((persona, index) => (
            <motion.div
              key={persona.title} // unique key
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PersonaCard
                title={persona.title}
                description={persona.description}
                icon={persona.icon}
                image={persona.image}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
