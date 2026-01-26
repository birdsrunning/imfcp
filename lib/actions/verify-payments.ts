"use server";

import { auth } from "@/lib/auth";
import { finalizePayment } from "../payments/finalize-payments";
import { headers } from "next/headers";

const PRODUCT_PRICE = 10_000 * 100;

export async function verifyPayment(reference: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  // 1️⃣ Verify with Paystack
  let result;
  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        cache: "no-store",
      },
    );
    result = await res.json();
  } catch (err) {
    console.error("PAYSTACK_VERIFY_ERROR", err);
    return { success: false, message: "Unable to reach Paystack" };
  }

  if (!result?.data || result.data.status !== "success") {
    return { success: false, message: "Payment not successful" };
  }

  if (result.data.amount !== PRODUCT_PRICE || result.data.currency !== "NGN") {
    return { success: false, message: "Payment details do not match" };
  }

  // 2️⃣ Finalize payment (idempotent, safe for webhook)
  const response = await finalizePayment({
    reference,
    userId: session.user.id,
    amount: result.data.amount,
    currency: result.data.currency,
  });

  if (!response.ok) {
    return { success: false, message: "Payment confirmation failed" };
  }

  return {
    success: true,
    message: response.alreadyProcessed
      ? "Payment was already confirmed"
      : "Payment successful and confirmed",
  };
}
