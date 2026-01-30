"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/data";

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
      className="relative max-h-96 overflow-hidden mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={wrapperRef} style={{ y }}>
        {/* GRID A */}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              comment={testimonial.comment}
            />
          ))}
        </div>

        {/* GRID A (CLONE) */}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 max-w-7xl mx-auto mt-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              comment={testimonial.comment}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
