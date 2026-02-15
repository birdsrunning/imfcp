"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { db } from "@/db"; // my db
import { images } from "@/db/schema";
import sharp from "sharp";
import { type UploadFormType, UploadFormSchema } from "@/schema/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

// creating the new S3 client
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

const extMap: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export async function uploadImage(unSafeData: UploadFormType) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, data: null, message: "Unauthorized" };
  }
  if (!session?.user?.id) {
    return { success: false, data: null, message: "Unauthorized" };
  }

  if (session.role !== "admin") {
    return { success: false, data: null, message: "Unauthorized" };
  }

  const safeData = UploadFormSchema.safeParse(unSafeData);
  if (!safeData.success)
    return { success: false, data: null, message: "Incomplete upload" };

  const file = safeData.data.image;
  if (!file) return { success: false, data: null, message: "No file uploaded" };
  if (!file.type.startsWith("image/"))
    return { success: false, data: null, message: "File not of type image" };

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, data: null, message: "File too large (max 20MB)" };
  }

  const originalBuffer = Buffer.from(await file.arrayBuffer());

  // thumbnail
  const thumbnailBuffer = await sharp(originalBuffer)
    .rotate() // respect EXIF orientation
    .resize({
      width: 800,
      height: 1000, // ✅ 4:5 aspect ratio
      fit: "cover", // fills the frame, crops if needed
      position: "center",
    })
    .webp({ quality: 90 }) // 100 is overkill for web
    .toBuffer();

  const title = safeData.data.title;
  const slugBase = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_");
  const uniqueId = crypto.randomUUID();

  // ✅ make keys unique
  const thumbnailKey = `thumbnails/${slugBase}_${uniqueId}`;
  const originalExt = extMap[file.type];
  if (!originalExt) {
    return { success: false, data: null, message: "Unsupported image format" };
  }
  const originalKey = `originals/${slugBase}_${uniqueId}.${originalExt}`;
  const thumbnailUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${thumbnailKey}`;

  try {
    // upload both files in parallel
    await Promise.all([
      S3.send(
        new PutObjectCommand({
          Bucket: "thumbnails-imfcp",
          Key: thumbnailKey,
          Body: thumbnailBuffer,
          ContentType: "image/webp",
          CacheControl: "public, max-age=31536000, immutable",
        }),
      ),
      S3.send(
        new PutObjectCommand({
          Bucket: "imfcp",
          Key: originalKey,
          Body: originalBuffer,
          ContentType: file.type,
          CacheControl: "public, max-age=31536000, immutable",
        }),
      ),
    ]);

    const { categories: rawCategories } = safeData.data;
    const categories = Object.entries(rawCategories)
      .filter(([, value]) => value === true)
      .map(([key]) => key);

    const [createdImage] = await db
      .insert(images)
      .values({
        id: uniqueId,
        userId: session.user.id,
        title: safeData.data.title,
        description: safeData.data.description,
        categories,
        thumbnailUrlKey: thumbnailKey,
        originalKey,
        accessTier: safeData.data.accessTier,
      })
      .returning();

    if (createdImage) {
      return {
        success: true,
        data: { thumbnailKey, thumbnailUrl, originalKey },
        message: "Image uploaded successfully",
      };

      // Delete from client if fail to update database
    } else {
      await Promise.all([
        await S3.send(
          new DeleteObjectCommand({
            Bucket: "thumbnails-imfcp",
            Key: thumbnailKey,
          }),
        ),
        await S3.send(
          new DeleteObjectCommand({
            Bucket: "imfcp",
            Key: originalKey,
          }),
        ),
      ]);

      return {
        success: false,
        data: null,
        message: "Failed to update database",
      };
    }
  } catch {
    await Promise.allSettled([
      // DB cleanup (safe even if row doesn't exist)
      db.delete(images).where(eq(images.id, uniqueId)),

      // S3 cleanup (safe even if object doesn't exist)
      S3.send(
        new DeleteObjectCommand({
          Bucket: "thumbnails-imfcp",
          Key: thumbnailKey,
        }),
      ),
      S3.send(
        new DeleteObjectCommand({
          Bucket: "imfcp",
          Key: originalKey,
        }),
      ),
    ]);

    return {
      success: false,
      data: null,
      message: "Image failed to upload",
    };
  }
}