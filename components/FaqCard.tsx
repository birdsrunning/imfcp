"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full rounded-2xl bg-brand-black border border-white/10 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-white/70 shrink-0" />
          <h3 className="text-base md:text-lg font-medium text-white">
            {question}
          </h3>
        </div>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-white/70"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      {/* Animated Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm md:text-base text-white/70 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
