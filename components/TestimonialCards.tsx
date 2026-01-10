"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialCards() {
  const y = useMotionValue(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !wrapperRef.current) return;

    const speed = 0.03; // px per ms
    const moveBy = speed * delta;

    const height = wrapperRef.current.scrollHeight / 2;
    const currentY = y.get();

    if (currentY <= -height) {
      y.set(0);
    } else {
      y.set(currentY - moveBy);
    }
  });

  return (
    <div
      className="relative max-h-96 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={wrapperRef} style={{ y }}>
        {/* GRID A */}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 max-w-7xl mx-auto">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>

        {/* GRID A (CLONE) */}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 max-w-7xl mx-auto mt-6">
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
          <TestimonialCard />
        </div>
      </motion.div>
    </div>
  );
}
