import React from "react";
import GetAccess from "../get-access";
import { navLinks } from "@/data/data";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="fixed left-0 top-0 w-full pt-6 pb-2 flex justify-center items-center backdrop-blur-md
  bg-brand-white/10 px-6 z-50 text-brand-white
"
    >
      <div className="hidden h-14 px-4 text-sm md:h-16 md:text-base bg-brand-black rounded-full sm:flex items-center justify-between w-full max-w-3xl">
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-10 w-auto"
        />
        <ul className="list-none flex gap-6">
          {navLinks.map((navLink, index) => (
            <li key={index}>
              {<Link href={navLink.href}>{navLink.text}</Link>}
            </li>
          ))}
        </ul>
        <GetAccess href="/dashboard" />
      </div>
      <div className="sm:hidden h-14 px-2 text-sm md:h-16 md:text-base bg-brand-black rounded-full flex items-center justify-between w-full max-w-3xl">
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-10 w-auto"
        />

        <div className="p-2 rounded-full flex justify-center items-center bg-brand-orange ">
          <Menu className="text-brand-white"/>
        </div>
      </div>
    </nav>
  );
}

// Navbar logo: 40px height

// Mobile: 28–32px

// Use SVG

// Control height, not width

// Navbar: 64px

// Text: 16px

// Mobile: 56px / 14px

// Logo: 40px

// <nav className="h-14 px-4 text-sm md:h-16 md:text-base">

// what font?
