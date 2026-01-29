import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/forms/reset-password-form";

export default async function AuthPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }
  return <ResetPasswordForm />;
}
