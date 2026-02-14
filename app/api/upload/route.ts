import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { db } from "@/db";
import { images } from "@/db/schema";
import sharp from "sharp";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { UploadFormSchema } from "@/schema/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const formData = await req.formData();

    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      accessTier: formData.get("accessTier"),
      categories: JSON.parse(formData.get("categories") as string),
      image: formData.get("image"),
    };

    const parsed = UploadFormSchema.safeParse(rawData);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Incomplete upload" },
        { status: 400 },
      );
    }

    const file = parsed.data.image;
    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "File not of type image" },
        { status: 400 },
      );
    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File too large (max 20MB)" },
        { status: 400 },
      );
    }

    const ext = extMap[file.type];
    if (!ext) {
      return NextResponse.json(
        { success: false, message: "Unsupported image format" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // thumbnail
    const thumbnailBuffer = await sharp(buffer)
      .rotate()
      .resize(800, 1000, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 90 })
      .toBuffer();

    const slugBase = parsed.data.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_");

    const id = crypto.randomUUID();
    const originalKey = `originals/${slugBase}_${id}.${ext}`;
    const thumbnailKey = `thumbnails/${slugBase}_${id}.webp`;

    try {
      await Promise.all([
        S3.send(
          new PutObjectCommand({
            Bucket: "imfcp",
            Key: originalKey,
            Body: buffer,
            ContentType: file.type,
            CacheControl: "public, max-age=31536000, immutable",
          }),
        ),
        S3.send(
          new PutObjectCommand({
            Bucket: "thumbnails-imfcp",
            Key: thumbnailKey,
            Body: thumbnailBuffer,
            ContentType: "image/webp",
            CacheControl: "public, max-age=31536000, immutable",
          }),
        ),
      ]);

      const categories = Object.entries(parsed.data.categories)
        .filter(([, v]) => v)
        .map(([k]) => k);

      await db.insert(images).values({
        id,
        userId: session.user.id,
        title: parsed.data.title,
        description: parsed.data.description,
        categories,
        thumbnailUrlKey: thumbnailKey,
        originalKey,
        accessTier: parsed.data.accessTier,
      });

      return NextResponse.json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          originalKey,
          thumbnailKey,
        },
      });
    } catch (err) {
      await Promise.allSettled([
        db.delete(images).where(eq(images.id, id)),
        S3.send(
          new DeleteObjectCommand({
            Bucket: "imfcp",
            Key: originalKey,
          }),
        ),
        S3.send(
          new DeleteObjectCommand({
            Bucket: "thumbnails-imfcp",
            Key: thumbnailKey,
          }),
        ),
      ]);

      throw err;
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Image failed to upload" },
      { status: 500 },
    );
  }
}