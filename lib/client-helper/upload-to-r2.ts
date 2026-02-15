export async function uploadToR2({
  file,
  bucketUrl,
  key,
}: {
  file: File;
  bucketUrl: string;
  key: string;
}) {
  const uploadUrl = `${bucketUrl}/${key}`;

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return uploadUrl;
}
