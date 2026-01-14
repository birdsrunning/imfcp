"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import FeatureCard from "../FeatureCard";

const features = [
  { icon: "📊", title: "Real-time analytics" },
  { icon: "⚡", title: "Fast integrations" },
  { icon: "🔒", title: "Secure by default" },
  { icon: "📈", title: "Growth insights" },
  { icon: "🧠", title: "Smart automation" },
  { icon: "🛠️", title: "Custom workflows" },
];

export default function FeatureMarquee() {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !containerRef.current) return;

    const speed = 0.08; // px per ms
    const moveBy = speed * delta;

    const width = containerRef.current.scrollWidth / 2;
    const currentX = x.get();

    if (currentX <= -width) {
      x.set(0);
    } else {
      x.set(currentX - moveBy);
    }
  });

  return (
    <section className="border-t py-16 overflow-hidden">
      <p className="text-center text-base text-brand-white mb-6 mx-8">
        Designed to remove friction between your ideas and the final result.
      </p>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={containerRef}
          className="flex gap-4 w-max"
          style={{ x }}
        >
          {[...features, ...features].map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
