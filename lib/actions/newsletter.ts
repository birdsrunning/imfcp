// app/actions/newsletter.ts
"use server";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import crypto from "crypto";

export async function subscribeNewsletter(formData: FormData) {
  // Honeypot
  if (formData.get("company")) {
    return { success: true };
  }

  const email = formData.get("email") as string;
  if (!email) {
    return { success: false, message: "Email required" };
  }

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const allowed = await rateLimit(`newsletter:${ip}`);
  if (!allowed) {
    return {
      success: false,
      message: "Too many attempts. Try again shortly.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email" };
  }

  try {
    await db
      .insert(newsletterSubscribers)
      .values({
        id: crypto.randomUUID(),
        email,
      })
      .onConflictDoNothing();

    return { success: true };
  } catch (err) {
    console.error("Newsletter subscribe failed:", err);
    return { success: false, message: "Something went wrong" };
  }
}
