// lib/actions/special-question.ts
"use server";

import { z } from "zod";
import { db } from "@/db";
import { clientQuestions } from "@/db/schema";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendSpecialQuestion(formData: FormData) {
  const uniqueId = crypto.randomUUID();
  const parsed = Schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: "Invalid form input" };
  }

  const { name, email, message } = parsed.data;

  // 1️⃣ Save to DB
  await db.insert(clientQuestions).values({
    id: uniqueId,
    name,
    email,
    category: "special",
    message,
  });

  // 2️⃣ Send confirmation email
  await resend.emails.send({
    from: "Image For Creatives <noreply@imageforcreatives.com>",
    to: email,
    subject: "We received your question 👋",
    html: `
      <p>Hi ${name},</p>

      <p>Thanks for reaching out! We've received your question and will
      review it shortly.</p>

      <p><strong>Your message:</strong></p>
      <blockquote>${message}</blockquote>

      <p>We typically respond within 24 hours.</p>

      <p>— Image For Creatives Team</p>
    `,
  });

  return { success: true };
}
