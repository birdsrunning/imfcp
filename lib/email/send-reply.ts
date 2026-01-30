// lib/email/send-reply.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendClientReplyEmail({
  to,
  name,
  reply,
}: {
  to: string;
  name: string;
  reply: string;
}) {
  await resend.emails.send({
    from: "Image For Creatives <noreply@imageforcreatives.com>",
    to,
    subject: "Re: Your message to Image For Creatives",
    html: `
      <p>Hi ${name},</p>

      <p>${reply}</p>

      <br />
      <p>— Image For Creatives Team</p>
    `,
  });
}
