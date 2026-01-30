"use server";

import { db } from "@/db";
import { clientQuestions } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getClientQuestions() {
  return await db
    .select()
    .from(clientQuestions)
    .orderBy(desc(clientQuestions.createdAt));
}
