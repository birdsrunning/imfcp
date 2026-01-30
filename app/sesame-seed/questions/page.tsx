// app/admin/questions/page.tsx
import { getClientQuestions } from "@/lib/actions/get-clients-question";
import { ReplyBox } from "./reply-box";

export default async function AdminQuestionsPage() {
  const questions = await getClientQuestions();

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Client Questions</h1>

      {questions.length === 0 && (
        <p className="text-sm opacity-70">No questions yet.</p>
      )}

      {questions.map((q) => (
        <div
          key={q.id}
          className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{q.name}</p>
              <p className="text-xs opacity-70">{q.email}</p>
            </div>

            {q.replied ? (
              <span className="text-xs text-green-400">Replied</span>
            ) : (
              <span className="text-xs text-yellow-400">Pending</span>
            )}
          </div>

          <p className="text-sm whitespace-pre-wrap">{q.message}</p>

          {!q.replied && <ReplyBox questionId={q.id} />}

          {q.replied && q.reply && (
            <div className="rounded-lg bg-black/30 p-3 text-sm">
              <p className="opacity-60 mb-1">Your reply:</p>
              <p>{q.reply}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
