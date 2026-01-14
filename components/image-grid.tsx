"use client";

// set custom screen break

import type { ImageType } from "@/types/types";
import { ImageCard } from "./image-card";

// to install onDelete, onEdit and onDownload functionalities
// to style properly
// to add new

export function ImageGrid({ images }: { images: ImageType[] }) {
  return (
    <section
      className="
        grid
        grid-cols-1
        gap-4
        px-4
        sm:grid-cols-2
        sm:gap-5
        sm:px-6
        lg:grid-cols-3
        xl:grid-cols-4
        xl:gap-6
        xl:px-8
      "
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </section>
  );
}
