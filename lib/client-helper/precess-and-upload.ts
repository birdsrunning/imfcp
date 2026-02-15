import { convertToWebP } from "./convert-image-webp";

export async function processAndUploadImage(file: File) {
  const uniqueId = crypto.randomUUID();
  const slug = file.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/\.\w+$/, "");

  // keys
  const ext = file.type.split("/")[1] ?? "bin";
  const originalKey = `originals/${slug}_${uniqueId}.${ext}`;
  const webpKey = `thumbnails/${slug}_${uniqueId}.webp`;

  

  // convert to webp
  const webpFile = await convertToWebP(file, 0.9);
  console.log(webpFile)

  const resOriginal = await fetch("/api/get-upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: originalKey,
      filetype: file.type,
      bucket: "imfcp",
    }),
  });
  const { data } = await resOriginal.json();
  console.log(data);
  const originalUrl = data.url;

  const resThumbnail = await fetch("/api/get-upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: webpKey,
      filetype: file.type,
      bucket: "thumbnails-imfcp",
    }),
  });

  const { data: thumbnailData } = await resThumbnail.json();
  const thumbnailUrl = thumbnailData.url;

  await fetch(originalUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file, // check if i can upload direct or might need to buffer
  });

  await fetch(thumbnailUrl, {
    method: "PUT",
    headers: { "Content-Type": "image/webp" },
    body: webpFile, // check if i can upload direct or might need to buffer
  });

  return {
    originalKey,
    webpKey,
  };
}
