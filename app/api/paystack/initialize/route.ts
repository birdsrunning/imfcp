import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const PRODUCT_PRICE = 10_000 * 100; // kobo

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: session.user.email,
      amount: PRODUCT_PRICE,

      // ✅ METADATA IS CREATED HERE
      metadata: {
        userId: session.user.id,
        plan: "pro",
      },
    }),
  });

  const data = await res.json();

  if (!data.status) {
    return NextResponse.json(
      { error: "Paystack initialization failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    authorizationUrl: data.data.authorization_url,
    reference: data.data.reference,
  });
}
