"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Nav({
  isClicked,
  onClosed,
}: {
  isClicked: boolean;
  onClosed: () => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);
  const isAnimatingOut = useRef(false);

  // Animate open / close
  useEffect(() => {
    if (!navRef.current) return;

    // OPEN
    if (isClicked) {
      isAnimatingOut.current = false;

      gsap.fromTo(
        navRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" },
      );
      return;
    }

    // CLOSE
    if (!isAnimatingOut.current) {
      isAnimatingOut.current = true;

      gsap.to(navRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: onClosed, // parent controls unmount
      });
    }
  }, [isClicked, onClosed]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isClicked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isClicked]);

  // Parent controls rendering — no local state
  if (!isClicked) return null;

  return (
    <div
      ref={navRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-[#d85425] text-brand-light"
    >
      <button
        onClick={onClosed}
        className="absolute right-4 top-4 text-white"
        aria-label="Close navigation"
      >
        <X size={32} />
      </button>

      <Link href="/#features" onClick={onClosed}>
        <h1 className="text-5xl sm:text-7xl hover:scale-90 transition">
          Features
        </h1>
      </Link>

      <Link href="/#pricing" onClick={onClosed}>
        <h1 className="text-5xl sm:text-7xl hover:scale-90 transition">
          Pricing
        </h1>
      </Link>

      <Link href="/#faq" scroll={false} onClick={onClosed}>
        <h1 className="text-5xl sm:text-7xl hover:scale-90 transition">Faqs</h1>
      </Link>
    </div>
  );
}
