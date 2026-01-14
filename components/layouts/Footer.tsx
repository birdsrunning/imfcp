"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { personaTitles } from "@/data/data";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-brand-black text-brand-white py-16 px-6 md:px-12 lg:px-20 rounded-t-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-5xl font-bold mb-2">
            Made for <span className="bg-brand-orange">Directors.</span>
          </h2>
          <h2 className="text-2xl md:text-5xl font-bold">
            Built for Creatives.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-xs font-semibold tracking-wider mb-6 uppercase">
              USEFUL LINKS
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/app"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wider mb-6 uppercase">
              Social
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xs font-semibold tracking-wider mb-6 uppercase">
              Newsletter
            </h3>
            <div className="flex flex-col gap-6">
              <div className="">
                <form className="w-full bg-blue-700 flex relative">
                  <input
                    className="flex-1 h-12 focus:ring-0 focus:outline-brand-orange text-brand-black px-2 placeholder:opacity-40 placeholder:font-semibold placeholder:text-brand-black"
                    placeholder="submit email for newsletters?"
                  />
                  <button className="absolute right-0 top-0 h-full underline text-brand-black font-semibold">
                    Sign up?
                  </button>
                </form>
                <hr className=" border-brand-dark" />
              </div>

              <div className="text-xs tracking-wider mb-8">
                © IMFCP, ALL RIGHTS RESERVED, 2026
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-64">
          {/* Background SVG */}
          <div className="absolute inset-0 z-0">
            <img className="w-auto md:w-full h-full" src="/images/1.svg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
