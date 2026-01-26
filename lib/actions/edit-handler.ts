"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { db } from "@/db";
import { images } from "@/db/schema";
import sharp from "sharp";
import { EditFormSchema, type EditFormType } from "@/schema/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";

/* ---------- S3 ---------- */
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

export async function editImage(imageId: string, unSafeData: EditFormType) {
  /* ---------- auth ---------- */
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return { success: false, data: null, message: "Unauthorized" };
  }

  /* ---------- validation ---------- */
  const safeData = EditFormSchema.safeParse(unSafeData);
  if (!safeData.success) {
    return { success: false, data: null, message: "Invalid form data" };
  }

  /* ---------- fetch image ---------- */
  const [existingImage] = await db
    .select()
    .from(images)
    .where(eq(images.id, imageId));

  if (!existingImage) {
    return { success: false, data: null, message: "Image not found" };
  }

  if (existingImage.userId !== session.user.id) {
    return { success: false, data: null, message: "Unauthorized" };
  }

  const { title, description, categories, accessTier, image } = safeData.data;

  /* ---------- normalize categories ---------- */
  const normalizedCategories = Object.entries(categories)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  /* ---------- defaults (no image change) ---------- */
  let newOriginalKey = existingImage.originalKey;
  let newThumbnailKey = existingImage.thumbnailUrlKey;

  /* =====================================================
     IMAGE REPLACEMENT (ONLY IF FILE EXISTS)
     ===================================================== */
  if (image instanceof File) {
    if (!image.type.startsWith("image/")) {
      return { success: false, data: null, message: "File not of type image" };
    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024;
    if (image.size > MAX_FILE_SIZE) {
      return { success: false, data: null, message: "File too large (max 20MB)" };
    }

    const ext = extMap[image.type];
    if (!ext) {
      return { success: false, data: null, message: "Unsupported image format" };
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const thumbnailBuffer = await sharp(buffer)
      .rotate()
      .resize({ width: 800, height: 600, fit: "cover" })
      .webp({ quality: 100 })
      .toBuffer();

    const slugBase = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_");

    const uniqueId = crypto.randomUUID();

    newThumbnailKey = `thumbnails/${slugBase}_${uniqueId}`;
    newOriginalKey = `originals/${slugBase}_${uniqueId}.${ext}`;

    try {
      /* upload new files */
      await Promise.all([
        S3.send(
          new PutObjectCommand({
            Bucket: "thumbnails-imfcp",
            Key: newThumbnailKey,
            Body: thumbnailBuffer,
            ContentType: "image/webp",
            CacheControl: "public, max-age=31536000, immutable",
          }),
        ),
        S3.send(
          new PutObjectCommand({
            Bucket: "imfcp",
            Key: newOriginalKey,
            Body: buffer,
            ContentType: image.type,
            CacheControl: "public, max-age=31536000, immutable",
          }),
        ),
      ]);

      /* delete old files */
      await Promise.allSettled([
        S3.send(
          new DeleteObjectCommand({
            Bucket: "thumbnails-imfcp",
            Key: existingImage.thumbnailUrlKey,
          }),
        ),
        S3.send(
          new DeleteObjectCommand({
            Bucket: "imfcp",
            Key: existingImage.originalKey,
          }),
        ),
      ]);
    } catch (err) {
      console.error("Image replacement failed:", err);

      await Promise.allSettled([
        S3.send(
          new DeleteObjectCommand({
            Bucket: "thumbnails-imfcp",
            Key: newThumbnailKey,
          }),
        ),
        S3.send(
          new DeleteObjectCommand({
            Bucket: "imfcp",
            Key: newOriginalKey,
          }),
        ),
      ]);

      return {
        success: false,
        data: null,
        message: "Failed to replace image",
      };
    }
  }

  /* ---------- update DB ---------- */
  try {
    await db
      .update(images)
      .set({
        title,
        description: description || null,
        categories: normalizedCategories,
        accessTier,
        originalKey: newOriginalKey,
        thumbnailUrlKey: newThumbnailKey,
        updatedAt: new Date(),
      })
      .where(eq(images.id, imageId));

    return {
      success: true,
      data: { imageId },
      message: "Image updated successfully",
    };
  } catch (err) {
    console.error("DB update failed:", err);

    return {
      success: false,
      data: null,
      message: "Failed to update image",
    };
  }
}
