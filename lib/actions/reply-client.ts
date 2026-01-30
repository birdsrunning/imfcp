// lib/actions/reply-client.ts
"use server";

import { db } from "@/db";
import { clientQuestions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function replyToClient(questionId: string, reply: string) {
  const [question] = await db
    .select()
    .from(clientQuestions)
    .where(eq(clientQuestions.id, questionId));

  if (!question) {
    return { success: false };
  }

  // send email
  await resend.emails.send({
    from: "Image For Creatives <support@imageforcreatives.com>",
    to: question.email,
    subject: "Re: Your question to Image For Creatives",
    replyTo: "support@imageforcreatives.com",
    html: `
      <p>Hi ${question.name},</p>
      <p>${reply}</p>
      <br />
      <p>— Image For Creatives Team</p>
    `,
  });

  // update DB
  await db
    .update(clientQuestions)
    .set({
      reply,
      replied: true,
      repliedAt: new Date(),
    })
    .where(eq(clientQuestions.id, questionId));

  return { success: true };
}
