"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import FeatureCard from "../FeatureCard";

// Updated features aligned with the product
const features = [
  { icon: "🎨", title: "Curated Visuals" },
  { icon: "⚡", title: "Fast Asset Generation" },
  { icon: "📈", title: "Insights & Metrics" },
  { icon: "🧠", title: "AI-powered Suggestions" },
  { icon: "🛠️", title: "Custom Workflows" },
  { icon: "🌐", title: "Cross-platform Sharing" },
  { icon: "💾", title: "Version Control" },
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
    <section className="border-t py-16 overflow-hidden bg-brand-black/5">
      <p className="text-center text-base text-brand-white mb-6 mx-8">
        Designed to remove friction between your ideas and the final result.
      </p>

      <div
        className="relative cursor-grab"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={containerRef}
          className="flex gap-6 w-max"
          style={{ x }}
        >
          {/* Duplicate array for seamless looping */}
          {[...features, ...features].map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
