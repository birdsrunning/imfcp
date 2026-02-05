"use server";

import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { count } from "drizzle-orm";

export async function getNewsletterSubscriberCount() {
  try {
    const [{ total = 0 }] = await db
      .select({ total: count() })
      .from(newsletterSubscribers);

    return { total };
  } catch (error) {
    console.error("getNewsletterSubscriberCount error:", error);
    return { total: 0 };
  }
}
