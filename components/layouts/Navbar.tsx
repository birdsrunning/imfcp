import React from "react";
import { navLinks } from "@/data/data";
import Link from "next/link";
import { Menu } from "lucide-react";
import Login from "../Login";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      {/* Desktop / Tablet */}
      <nav
        className="
        hidden md:flex items-center justify-between
        min-h-2h-16 px-8 lg:px-16
        backdrop-blur-md bg-brand-black/20
        text-sm lg:text-base
      "
      >
        {/* Left */}
        <div className="flex items-center gap-12 p-4">
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
        h-14 max-w-[95%]
        px-4
        rounded-full
        flex items-center justify-between
        backdrop-blur-md bg-brand-black/80
      "
      >
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-8 w-auto"
        />

        <button
          className="
          h-9 w-9 rounded-full
          flex items-center justify-center
          bg-brand-orange
        "
        >
          <Menu className="h-5 w-5 text-brand-white" />
        </button>
      </nav>
    </header>
  );
}
