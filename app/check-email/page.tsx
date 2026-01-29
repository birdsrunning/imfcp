"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Mail className="h-6 w-6 text-foreground" />
        </div>

        <h1 className="mb-2 text-2xl font-semibold">
          Check your email
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          If an account exists for the email you entered, we’ve sent you a link
          to reset your password.
        </p>

        <p className="mb-8 text-sm text-muted-foreground">
          Didn’t see it? Check your spam folder — or try again in a minute.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/forgot-password"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-muted"
          >
            Try a different email
          </Link>

          <Link
            href="/auth"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Back to login
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
