import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function NameGenerator() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    <span className="">User</span>;
  }
  return <span className="">{session?.user.name}</span>;
}
