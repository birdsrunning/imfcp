import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const options = {
  database: drizzleAdapter(db, {
    provider: "pg",
    schema, // <-- REQUIRED
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
    
      await resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
    },
  },
  plugins: [nextCookies()],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      const profile = await db.query.userProfile.findFirst({
        where: (p, { eq }) => eq(p.userId, user.id),
      });
      return {
        role: profile?.role,
        paymentStatus: profile?.paymentStatus,
        user: {
          ...user,
        },
        session,
      };
    }, options), // pass options here
  ],
});
