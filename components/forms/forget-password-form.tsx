"use client";

// React
import { useState } from "react";

// Next
import { useRouter } from "next/navigation";

// UI
import { Button } from "@/components/ui/button";

// Auth
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const forgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (error) {
        setError(error.message || "Failed to send reset email");
        return;
      }

      // optional: redirect or show success page
      router.push("/check-email");
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black relative overflow-hidden">
      {/* subtle orange glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,120,0,0.15),transparent_60%)]" />

      <div className="absolute top-6 left-6 flex gap-4 items-center">
        <img
          src="/images/logo/logoOrange.svg"
          alt="Logo"
          className="h-14 w-auto"
        />
        <h1>IMFC</h1>
      </div>

      <div className="relative flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-brand-black/80 backdrop-blur border border-brand-white/10 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-brand-white">
              Enter your email to reset your password
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-brand-orange/40 bg-brand-orange/10 p-4 text-brand-white">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={forgotPassword} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-brand-black border border-brand-white/20 px-3 py-2 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-brand-orange py-3 font-medium text-brand-white hover:bg-brand-orange/90 transition"
            >
              {isLoading ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
