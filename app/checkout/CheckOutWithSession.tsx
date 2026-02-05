"use client";

import { useState } from "react";
import {
  Loader2,
  Lock,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Session } from "@/types/types";
import { verifyPayment } from "@/lib/actions/verify-payments";
import { redirect } from "next/navigation";

const PRODUCT = {
  name: "Pro Access",
  price: 10000,
  description: "One-time payment. Lifetime access.",
  highlights: [
    "Lifetime access — no subscriptions",
    "All future features included",
    "Priority updates & improvements",
    "Secure Paystack checkout",
  ],
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
        toast.error("Missing Paystack public key");
        setLoading(false);
        return;
      }

      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email: session.user.email,
        amount: PRODUCT.price * 100,
        reference,
        onSuccess: async () => {
          toast.success("Payment completed! Verifying…");

          try {
            const result = await verifyPayment(reference);
            if (!result.success) {
              toast.error(result.message || "Verification failed");
            }
          } catch {
            toast.error("Payment verification failed");
          } finally {
            setLoading(false);
            redirect("/dashboard");
          }
        },
        onCancel: () => {
          setError("Payment was cancelled.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error(err);
      setError("Payment could not be initialized.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0a0b] to-[#151314] flex items-center justify-center px-6">
      <div
        className="
          w-full max-w-5xl grid md:grid-cols-2 gap-10
          rounded-3xl border border-white/10
          bg-white/5 backdrop-blur-xl
          shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          p-10
        "
      >
        {/* ================= LEFT: PRODUCT ================= */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-orange text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Upgrade your account
            </div>

            <h1 className="text-4xl font-bold text-white">
              {PRODUCT.name}
            </h1>

            <p className="text-white/70 max-w-md">
              {PRODUCT.description}
            </p>

            <ul className="space-y-3 pt-4">
              {PRODUCT.highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/80"
                >
                  <Check className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-orange" />
              Secure payment
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-brand-orange" />
              Encrypted checkout
            </div>
          </div>
        </div>

        {/* ================= RIGHT: CHECKOUT ================= */}
        <div
          className="
            rounded-2xl bg-black/40 border border-white/10
            p-8 flex flex-col justify-between
          "
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm text-white/60">Total</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-extrabold text-white">
                  ₦{PRODUCT.price.toLocaleString()}
                </span>
                <span className="text-sm text-white/50 mb-2">
                  one-time
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-white/70">
              You’ll get immediate access after payment.
              No recurring charges.
            </div>

            {error && (
              <p className="text-sm text-brand-orange font-medium">
                {error}
              </p>
            )}
          </div>

          <div className="space-y-4 mt-8">
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="
                h-14 text-lg font-semibold
                bg-brand-orange text-black
                hover:bg-brand-orange/90
                shadow-[0_0_40px_rgba(255,140,0,0.35)]
                disabled:opacity-70
              "
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing…
                </>
              ) : (
                `Unlock Pro Access`
              )}
            </Button>

            <p className="text-xs text-center text-white/50">
              Secured by Paystack · Cards & bank transfer supported
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
