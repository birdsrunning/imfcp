"use client";

import { sendSpecialQuestion } from "@/lib/actions/special-question";
import { toast } from "sonner";

export default function SpecialQuestionForm() {
  async function action(formData: FormData) {
    const res = await sendSpecialQuestion(formData);

    if (res.success) {
      toast.success("Question sent successfully ✨");
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="rounded-2xl bg-brand-black backdrop-blur-md border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-brand-white">
        Ask a specialized question
      </h3>

      <p className="mt-2 text-sm text-brand-white/80">
        Tell us about your specific use case and we’ll get back to you.
      </p>

      <form action={action} className="mt-4 flex flex-col gap-4">
        <input
          name="name"
          placeholder="Your name"
          required
          className="rounded-lg px-4 py-3 text-sm outline-none bg-brand-white text-brand-black focus:outline-brand-orange"
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="rounded-lg px-4 py-3 text-sm outline-none bg-brand-white text-brand-black focus:outline-brand-orange"
        />

        <textarea
          name="message"
          rows={4}
          required
          placeholder="Describe your question or request..."
          className="rounded-lg px-4 py-3 text-sm outline-none resize-none bg-brand-white text-brand-black focus:outline-brand-orange"
        />

        <button
          type="submit"
          className="self-start rounded-full bg-brand-orange px-5 py-2.5
                     text-sm font-medium text-white hover:opacity-90 border-white/20"
        >
          Send question
        </button>
      </form>
    </div>
  );
}
