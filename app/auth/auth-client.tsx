"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp, signInSocial } from "@/lib/actions/auth-actions";
import { Button } from "@/components/ui/button";

export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");
    try {
      await signInSocial(provider);
    } catch (err) {
      setError("Authentication failed");
      console.log(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = isSignIn
        ? await signIn(email, password)
        : await signUp(email, password, name);

      if (result?.user) router.push("/dashboard");
      else setError("Authentication failed");
    } catch (err) {
      setError("Authentication error");
      console.log(err instanceof Error ? err.message : "Authentication failed");
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
            <h1 className="text-3xl font-bold text-brand-white">
              {isSignIn ? "Welcome Back" : "Create an Account"}
            </h1>
            <p className="text-brand-white/70">
              {isSignIn ? "Sign in to continue" : "Get started with IMFC"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-brand-orange/40 bg-brand-orange/10 p-4 text-brand-white">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Social */}
          <Button
            onClick={() => handleSocialAuth("google")}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-brand-white text-brand-black hover:bg-brand-white/90 transition"
          >
            {/* Google icon untouched */}
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-brand-black text-brand-white/60">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isSignIn && (
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg bg-brand-black border border-brand-white/20 px-3 py-2 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-brand-black border border-brand-white/20 px-3 py-2 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-brand-black border border-brand-white/20 px-3 py-2 text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-brand-orange py-3 font-medium text-brand-white hover:bg-brand-orange/90 transition"
            >
              {isLoading ? "Loading…" : isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError("");
                setName("");
              }}
              className="text-sm text-brand-white hover:underline"
            >
              {isSignIn
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
