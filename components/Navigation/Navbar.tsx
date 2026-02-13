"use client";

import React, { useState, useEffect } from "react";
import { navLinks } from "@/data/data";
import Link from "next/link";
import { Menu } from "lucide-react";
import Login from "../Login";
import Nav from "./hamburger";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close if screen exceeds mobile (>= 640px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed md:top-8 top-4 md:left-1/2 md:-translate-x-1/2 w-3/4 z-50">
      {/* ================= Desktop / Tablet ================= */}
      <nav
        className="
          hidden md:flex items-center justify-between
          min-h-16 px-2
          rounded-2xl
          backdrop-blur-md
          bg-brand-black/70
          border border-white/10
          text-sm font-bold
        "
      >
        {/* Left */}
        <div className="flex items-center gap-12 p-2">
          <img
            src="/images/logo/logoOrange.svg"
            alt="Logo"
            className="h-14 w-auto"
          />

          <ul className="flex items-center gap-6 text-white/80">
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <Link
                  href={navLink.href}
                  className="transition-colors hover:text-white"
                >
                  {navLink.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          <Login href="/dashboard" />
        </div>
      </nav>

      {/* ================= Mobile ================= */}
      <nav
        className="
          md:hidden
          mx-auto mt-3
          max-w-[95%]
          px-4 py-2
          rounded-2xl
          flex items-center justify-between
          backdrop-blur-md
          bg-brand-black/70
          border border-white/10
        "
      >
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-12 w-auto"
        />

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            h-10 w-10 rounded-full
            flex items-center justify-center
            bg-brand-orange
          "
        >
          <Menu className="h-5 w-5 text-brand-white" />
        </button>
      </nav>

      <Nav isClicked={isOpen} onClosed={() => setIsOpen(false)} />
    </header>
  );
}
