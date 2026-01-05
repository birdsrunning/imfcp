import { auth } from "@/lib/auth";
import PadLock from "./PadLock";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/sesame-seed");
  }
  return <PadLock />;
}
