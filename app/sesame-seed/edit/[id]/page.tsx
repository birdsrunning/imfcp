import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import EditClient from "./Edit-client";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditImagePage({ params }: PageProps) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔐 Admin guard — redirect, not return object
  if (!session || session.role !== "admin") {
    redirect("/auth");
  }

  const image = await db.query.images.findFirst({
    where: eq(images.id, id),
  });

  if (!image) {
    notFound();
  }

  return <EditClient image={image} />;
}
