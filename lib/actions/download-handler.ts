"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // 🔑 REQUIRED for R2
});

export async function getDownloadUrl(imageId: string) {
  /* ---------- AUTH ---------- */
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, url: null };
  }

  /* ---------- DB ---------- */
  const image = await db.query.images.findFirst({
    where: eq(images.id, imageId),
  });

  if (!image) {
    return { success: false, url: null };
  }

  /* ---------- ACCESS ---------- */
  if (image.accessTier === "premium" && session.paymentStatus !== 'paid') {
    return { success: false, url: null };
  }

  /* ---------- PRESIGN ---------- */
  const command = new GetObjectCommand({
    Bucket: "imfcp",
    Key: image.originalKey,
    ResponseContentDisposition: `attachment; filename="${image.title}.jpg"`,
  });

  const signedUrl = await getSignedUrl(S3, command, {
    expiresIn: 300, // seconds
  });

  return {
    success: true,
    url: signedUrl,
  };
}
