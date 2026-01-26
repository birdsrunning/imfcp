"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Session } from "@/types/types";
import { verifyPayment } from "@/lib/actions/verify-payments";
import { redirect } from "next/navigation";

const PRODUCT = {
  name: "Pro Access",
  price: 10000,
  description: "One-time payment. Lifetime access.",
};

export default function CheckoutPageWithSession({
  session,
}: {
  session: Session;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  const reference = `pro_${session.user.id}_${Date.now()}`;

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      if (!publicKey) {
        toast.error("Something went wrong: missing Paystack key");
        setLoading(false);
        return;
      }

      // ✅ Dynamic import (browser-only)
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email: session.user.email,
        amount: PRODUCT.price * 100, // kobo
        reference,
        onSuccess: async () => {
          toast.success("Payment completed! Verifying...");

          try {
            const result = await verifyPayment(reference); // fallback verification
            if (result.success) {
              toast.success(result.message);
            } else {
              toast.error(result.message || "Payment verification failed");
            }
          } catch (err) {
            console.error("VERIFY_PAYMENT_ERROR", err);
            toast.error("Payment verification failed");
          } finally {
            setLoading(false);
            redirect("/dashboard"); // redirect after fallback
          }
        },
        onCancel: () => {
          toast.error("Transaction cancelled");
          setError("Payment could not be initialized. Try again.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("PAYSTACK_INIT_ERROR", err);
      setError("Payment could not be initialized. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-white p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-brand-black">
            {PRODUCT.name}
          </h1>
          <p className="text-sm text-brand-black/70">{PRODUCT.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold text-brand-black">
            ₦{PRODUCT.price.toLocaleString()}
          </span>
          <span className="text-sm text-brand-black/70">one-time</span>
        </div>

        {/* Benefits */}
        <ul className="text-sm text-brand-black/80 space-y-2">
          <li>• Lifetime access</li>
          <li>• All future updates included</li>
          <li>• Secure Paystack checkout</li>
        </ul>

        {/* Error */}
        {error && (
          <p className="text-sm text-brand-orange font-medium">{error}</p>
        )}

        {/* CTA */}
        <Button
          onClick={handlePayment}
          disabled={loading}
          className="
            w-full h-12 text-base font-semibold
            bg-brand-orange text-brand-white
            hover:bg-brand-orange/90
            disabled:opacity-70
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting…
            </>
          ) : (
            `Pay ₦${PRODUCT.price.toLocaleString()}`
          )}
        </Button>

        {/* Trust */}
        <div className="flex items-center justify-center gap-2 text-xs text-brand-black/70">
          <Lock className="h-3 w-3 text-brand-orange" />
          Secured by Paystack
        </div>
      </div>
    </div>
  );
}
