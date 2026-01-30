"use client";

// React
import { useState } from "react";

// Next
import { useRouter, useSearchParams } from "next/navigation";

// UI
import { Button } from "@/components/ui/button";

// Auth
import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!token) {
      setError("Invalid or expired reset link");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (error) {
        setError(error.message || "Failed to reset password");
        return;
      } else {
      }

      toast.success("Password reset successfully");
      
      router.push("/auth?reset=success");
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

      <div className="relative flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-brand-black/80 backdrop-blur border border-brand-white/10 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-brand-white">
              Enter a new password for your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-brand-orange/40 bg-brand-orange/10 p-4 text-brand-white">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={resetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-brand-black border border-brand-white/20 px-3 py-2 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-brand-black border border-brand-white/20 px-3 py-2 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-brand-orange py-3 font-medium text-brand-white hover:bg-brand-orange/90 transition"
            >
              {isLoading ? "Resetting…" : "Reset password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
