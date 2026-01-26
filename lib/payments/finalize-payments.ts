import crypto from "crypto";
import { db } from "@/db";
import { payments, userProfile } from "@/db/schema";

type FinalizeInput = {
  reference: string;
  userId: string;
  amount: number;
  currency: string;
};

type FinalizeResult =
  | { ok: true; alreadyProcessed: boolean }
  | { ok: false; error: string };

export async function finalizePayment(
  input: FinalizeInput
): Promise<FinalizeResult> {
  const { reference, userId, amount, currency } = input;

  try {
    // 1️⃣ Insert payment safely (idempotent)
    const inserted = await db
      .insert(payments)
      .values({
        id: crypto.randomUUID(),
        userId,
        reference,
        amount: amount.toString(),
        currency,
        provider: "paystack",
        status: "SUCCESS",
      })
      .onConflictDoNothing({ target: payments.reference }) // ✅ ensures idempotency
      .returning({ id: payments.id });

    // 2️⃣ Already processed?
    if (inserted.length === 0) {
      return { ok: true, alreadyProcessed: true };
    }

    // 3️⃣ Upgrade user (idempotent)
    await db
      .insert(userProfile)
      .values({
        userId,
        paymentStatus: "paid",
        plan: "pro",
      })
      .onConflictDoUpdate({
        target: userProfile.userId,
        set: {
          paymentStatus: "paid",
          plan: "pro",
        },
      });

    return { ok: true, alreadyProcessed: false };
  } catch (err) {
    console.error("FINALIZE_PAYMENT_ERROR", {
      reference,
      userId,
      err,
    });

    return { ok: false, error: "Failed to finalize payment" };
  }
}
