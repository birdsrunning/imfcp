"use client";

import type { TImage } from "@/types/types";
import { ImageCard } from "./image-card";

// to install onDelete, onEdit and onDownload functionalities
// to style properly
// to add new

export function ImageGrid({ images }: { images: TImage[] }) {
  return (
    <div
      className="
        grid
        gap-4
        sm:gap-5
        md:gap-6
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        max-w-7xl
        flex-1 ml-72
        p-2
      "
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
