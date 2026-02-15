import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ALLOWED_BUCKETS = ["imfcp", "thumbnails-imfcp"];

// creating the new S3 client
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
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { filename, filetype, bucket } = body;

    if (!ALLOWED_BUCKETS.includes(bucket)) {
      return NextResponse.json(
        { success: false, message: "Invalid bucket" },
        { status: 400 },
      );
    }

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      ContentType: filetype,
    });

    const presignedUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });

    // return new Response(JSON.stringify({ url: presignedUrl }), {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });

    return NextResponse.json(
      {
        success: true,
        data: { url: presignedUrl },
        message: "Upload URL generated",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    // return new Response(
    //   JSON.stringify({ error: "Failed to generate presigned URL" }),
    //   { status: 500, headers: { "Content-Type": "application/json" } },
    // );

    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Upload URL failed to generated",
      },
      { status: 500 },
    );
  }
}
