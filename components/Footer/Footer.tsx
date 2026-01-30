"use client";

import { useState } from "react";
import Link from "next/link";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { useFormStatus } from "react-dom";
import MotionText from "./motion-text";
import { toast } from "sonner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="absolute right-0 top-0 h-full underline text-brand-black font-semibold disabled:opacity-50"
    >
      {pending ? "Saving..." : "Sign up?"}
    </button>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-brand-black text-brand-white py-16 px-6 md:px-12 lg:px-20 rounded-t-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-5xl font-bold mb-2">
            Made for <MotionText />
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
                  href="/"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/policy"
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
                  href="https://www.instagram.com/image_for_creatives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/image4creatives?s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4683D] transition-colors"
                >
                  X
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
                <form
                  action={async (formData) => {
                    const res = await subscribeNewsletter(formData);
                    if (res.success) {
                      setEmail("");
                    }
                    if (res.success) {
                      setEmail("");
                      toast.success("You’re on the newsletter list ✨");
                    } else {
                      toast.error(res.message ?? "Something went wrong");
                    }
                  }}
                  className="w-full bg-brand-black flex relative"
                >
                  {/* Honeypot (bots fill this, humans never see it) */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px]"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12 focus:ring-0 focus:outline-brand-orange text-brand-black px-2 placeholder:opacity-40 placeholder:font-semibold placeholder:text-brand-black"
                    placeholder="submit email for newsletters?"
                  />

                  <SubmitButton />
                </form>
                <hr className=" border-brand-dark" />
              </div>

              <div className="text-xs tracking-wider mb-8">
                © IMFCP, ALL RIGHTS RESERVED, 2026
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-56">
          {/* Background SVG */}
          <div className="absolute inset-0 z-0">
            <img className="w-auto md:w-full h-full" src="/images/1.svg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
