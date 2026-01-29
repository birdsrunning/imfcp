import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ForgotPasswordForm from "@/components/forms/forget-password-form";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }
  return <ForgotPasswordForm />;
}
