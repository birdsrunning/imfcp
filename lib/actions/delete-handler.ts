"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

// reuse the same S3 client config
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function deleteImage(imageId: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id || session.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  if (!imageId) {
    return { success: false, message: "Missing image ID" };
  }

  // 1️⃣ Fetch image (we need the keys)
  const image = await db.query.images.findFirst({
    where: eq(images.id, imageId),
  });

  if (!image) {
    return { success: false, message: "Image not found" };
  }

  try {
    // 2️⃣ Delete S3 objects in parallel
    await Promise.allSettled([
      S3.send(
        new DeleteObjectCommand({
          Bucket: "thumbnails-imfcp",
          Key: image.thumbnailUrlKey,
        }),
      ),
      S3.send(
        new DeleteObjectCommand({
          Bucket: "imfcp",
          Key: image.originalKey,
        }),
      ),
    ]);

    // 3️⃣ Delete DB row
    await db.delete(images).where(eq(images.id, imageId));

    return {
      success: true,
      message: "Image deleted successfully",
    };
  } catch (err) {
    console.error("Delete failed:", err);

    return {
      success: false,
      message: "Failed to delete image",
    };
  }
}
