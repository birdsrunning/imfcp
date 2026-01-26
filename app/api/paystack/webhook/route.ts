import crypto from "crypto";
import { headers } from "next/headers";
import { finalizePayment } from "@/lib/payments/finalize-payments";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("x-paystack-signature") ?? "";

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event !== "charge.success") {
    return new Response("Ignored", { status: 200 });
  }

  const data = event.data;

  const result = await finalizePayment({
    reference: data.reference,
    userId: data.metadata.userId,
    amount: data.amount,
    currency: data.currency,
  });

  if (!result.ok) {
    return new Response("Server error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
