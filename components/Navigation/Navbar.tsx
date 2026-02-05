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
    <header className="fixed top-0 left-0 w-full z-50 ">
      {/* Desktop / Tablet */}
      <nav
        className="
        hidden md:flex items-center justify-between
        min-h-2h-16 px-8 lg:px-16
        backdrop-blur-md bg-brand-black/20
        text-xs lg:text-base font-bold
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

      {/* Mobile */}
      <nav
        className="
        md:hidden
        mx-auto mt-3
        h-fit max-w-[95%]
        px-4
        py-2
        rounded-2xl
        flex items-center justify-between
        backdrop-blur-md bg-brand-black/80
      "
      >
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-12 w-auto"
        />

        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
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
