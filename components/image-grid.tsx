"use client";

import type { ImageType } from "@/types/types";
import { ImageCard } from "./image-card";
import { SearchX } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
        <SearchX className="h-7 w-7 text-[#F4683D]" />
      </div>

      <h3 className="text-lg font-semibold text-[#EAE8E8]">No images found</h3>

      <p className="max-w-sm text-sm text-white/60">
        Try adjusting your search or filters, or check back later — new images
        are added regularly.
      </p>
    </div>
  );
}

export function ImageGrid({
  images,
  isAdmin,
  isPaid,
}: {
  images: ImageType[];
  isAdmin: boolean;
  isPaid: boolean;
}) {
  if (!images || images.length === 0) {
    return <EmptyState />;
  }

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
