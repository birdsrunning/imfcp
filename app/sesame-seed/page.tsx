import React from "react";
import { auth } from "@/lib/auth";
import SesameSeed from "./SesameSeed";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Sesame() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sesame-seed/auth");
  }
  if (session.role === "admin") {
    return <SesameSeed />;
  } else {
    redirect("/");
  }
}
