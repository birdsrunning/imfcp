import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditClient from "./Edit-client";


export default async function EditImagePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.role !== "admin") {
    return { success: false, data: null, message: "Unauthorized" };
  }
  const image = await db.query.images.findFirst({
    where: eq(images.id, id),
  });

  if (!image) {
    notFound();
  }

  return <EditClient image={image} />;
}
