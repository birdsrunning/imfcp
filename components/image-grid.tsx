"use client";

import type { ImageType } from "@/types/types";
import { ImageCard } from "./image-card";

export function ImageGrid({
  images,
  isAdmin,
  isPaid,
}: {
  images: ImageType[];
  isAdmin: boolean;
  isPaid: boolean;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          isAdmin={isAdmin}
          isPaid={isPaid}
        />
      ))}
    </section>
  );
}
