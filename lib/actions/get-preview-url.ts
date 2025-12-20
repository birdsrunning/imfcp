"use server";
// import { auth } from "../auth";
// import { headers } from "next/headers";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function getPreviewUrl(imageKey: string) {
  //   const session = await auth.api.getSession({ headers: await headers() });
  //   if (!session) throw new Error("Unauthorized");

  const command = new GetObjectCommand({
    Bucket: "imfcp", // bucket
    Key: imageKey,
  });

  // ⏱️ Very short expiry
  const url = await getSignedUrl(S3, command, {
    expiresIn: 60 * 5,
  });

  return { url };
}
