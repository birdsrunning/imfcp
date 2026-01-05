import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ success: false, error: "No file provided" });
  }

  // Convert file to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ✅ Path to Desktop/boom (relative from project root)
  const boomDir = join(process.cwd(), "..", "..", "boom");

  // ✅ Ensure the directory exists
  await mkdir(boomDir, { recursive: true });

  // ✅ Full file path
  const filePath = join(boomDir, file.name);

  // ✅ Write file
  await writeFile(filePath, buffer);

  console.log(`File saved to ${filePath}`);

  return NextResponse.json({ success: true });
}
