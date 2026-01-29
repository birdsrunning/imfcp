// app/api/auth/social/callback/route.ts
"use server";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userProfile } from "@/db/schema";
import { createNotification } from "@/lib/actions/notifications";

export async function GET(req: NextRequest) {
  try {
    // Get BetterAuth session after social login redirect
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json(
        { error: "No user after social login" },
        { status: 400 },
      );
    }

    const userId = session.user.id;
    const userName = session.user.name ?? "User";

    // Check if a user profile already exists
    const profile = await db.query.userProfile.findFirst({
      where: (p, { eq }) => eq(p.userId, userId),
    });

    // If profile doesn't exist, create it + welcome notification
    if (!profile) {
      await db.insert(userProfile).values({
        userId,
        role: "user",
        paymentStatus: "free",
      });

      await createNotification({
        userId,
        title: "Welcome to IMFC 🎉",
        message: `Hi ${userName}, your account has been successfully created via social login`,
        type: "success",
        link: "/dashboard",
      });
    }

    // Redirect to dashboard (Next.js App Router friendly)
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("[Social Login Callback Error]", error);

    // Return a JSON error if something fails
    return NextResponse.json(
      { error: "Failed to process social login", details: error },
      { status: 500 },
    );
  }
}
