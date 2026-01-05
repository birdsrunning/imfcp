"use client";

// set custom screen break

import type { ImageType } from "@/types/types";
import { ImageCard } from "./image-card";

// to install onDelete, onEdit and onDownload functionalities
// to style properly
// to add new

export function ImageGrid({ images }: { images: ImageType[] }) {
  return (
    <div
      className="
      bg-brand-black
        grid
        gap-4
        sm:gap-5
        md:gap-6
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        p-4
      "
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
