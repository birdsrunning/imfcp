export async function convertToWebP(file: File, quality = 0.70): Promise<File> {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const url = URL.createObjectURL(file);
  img.src = url;

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const blob: Blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/webp", quality);
  });

  URL.revokeObjectURL(url);

  return new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
    type: "image/webp",
  });
}