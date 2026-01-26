import React from "react";
import CheckoutPageWithSession from "./CheckOutWithSession";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CheckOutWithOutSession from "./CheckOutWithOutSession";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    return <CheckoutPageWithSession session={session} />;
  } else {
    return <CheckOutWithOutSession />;
  }
}
