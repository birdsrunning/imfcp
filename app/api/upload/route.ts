import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { db } from "@/db";
import { images } from "@/db/schema";
import crypto from "crypto";

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

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return Response.json({ success: false, message: "Unauthorized" });
  }

  const body = await req.json();
  console.log("I was touched");

  let inserted = false;

  try {
    const [createdImage] = await db
      .insert(images)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        title: body.title,
        description: body.description,
        categories: Object.entries(body.categories)
          .filter(([, v]) => v)
          .map(([k]) => k),
        originalKey: body.originalKey,
        thumbnailUrlKey: body.webpKey,
        accessTier: body.accessTier,
      })
      .returning();

    if (!createdImage) throw new Error("DB insert failed");
    inserted = true;
    // return Response.json({
    //   success: true,
    //   message: "Image saved",
    // });

    return NextResponse.json(
      {
        success: true,
        message: "Image saved",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    if (!inserted) {
      const deletes = [];

      if (body.webpKey) {
        deletes.push(
          S3.send(
            new DeleteObjectCommand({
              Bucket: "thumbnails-imfcp",
              Key: body.webpKey,
            }),
          ),
        );
      }

      if (body.originalKey) {
        deletes.push(
          S3.send(
            new DeleteObjectCommand({
              Bucket: "imfcp",
              Key: body.originalKey,
            }),
          ),
        );
      }

      await Promise.allSettled(deletes);
    }

    return NextResponse.json(
      {
        success: false,
        message: "Image failed to upload",
      },
      { status: 500 },
    );
  }

  // const created = await db.insert(images).values({
  //   id: crypto.randomUUID(),
  //   userId: session.user.id, // ✅ REQUIRED FIELD
  //   title: body.title,
  //   description: body.description,
  // categories: Object.entries(body.categories)
  //   .filter(([, v]) => v)
  //   .map(([k]) => k),
  // originalKey: body.originalKey,
  // thumbnailUrlKey: body.webpUrl,
  // accessTier: body.accessTier,
  // });
}
