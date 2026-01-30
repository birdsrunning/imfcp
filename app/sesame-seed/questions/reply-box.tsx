// app/admin/questions/reply-box.tsx
"use client";

import { replyToClient } from "@/lib/actions/reply-client";
import { toast } from "sonner";
import { useState } from "react";

export function ReplyBox({ questionId }: { questionId: string }) {
  const [sending, setSending] = useState(false);

  async function action(formData: FormData) {
    setSending(true);

    const reply = formData.get("reply") as string;
    const res = await replyToClient(questionId, reply);

    setSending(false);

    if (res.success) {
      toast.success("Reply sent 📧");
    } else {
      toast.error("Failed to send reply");
    }
  }

  return (
    <form action={action} className="space-y-2">
      <textarea
        name="reply"
        required
        rows={3}
        placeholder="Type your reply..."
        className="w-full rounded-lg bg-black/40 px-3 py-2 text-sm outline-none"
      />

      <button
        disabled={sending}
        className="rounded-full bg-brand-orange px-4 py-1.5 text-sm text-white disabled:opacity-60"
      >
        {sending ? "Sending..." : "Send reply"}
      </button>
    </form>
  );
}
