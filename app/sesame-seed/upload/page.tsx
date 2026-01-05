import React from "react";
import UploadClient from "./upload-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sesame-seed");
  }

  if (session.role === "admin") {
    return <UploadClient />;
  } else {
    return (
      <div className="min-h-screen">
        <h1>Unauthorized access</h1>
      </div>
    );
  }
}
