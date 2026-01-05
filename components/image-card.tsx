"use client";
import { Download, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Renamed to avoid confusion with the built-in <img>
import type { ImageCardProps } from "@/types/types";

export function ImageCard({
  image,
  onDelete,
  onEdit,
  onDownload,
}: ImageCardProps) {
  // Determine if this is a "critical" image (e.g., the first one on the page)

  return (
    <div>
      <div className="flex flex-col w-full">
        <div
          className="
            group relative w-full aspect-[4/3] overflow-hidden rounded-2xl
            bg-gradient-to-br from-gray-800 to-gray-900 ring-1 ring-white/10
            hover:ring-brand-orange hover:ring-2 transition-all duration-300
          "
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_THUMBNAIL_CDN}${image.thumbnailUrlKey}`}
            alt={image.title}
            fill
            sizes="
      (max-width: 640px) 100vw,
      (max-width: 1024px) 50vw,
      33vw
    "
            // Note: decoding="async" is handled internally by NextImage
            className="
        object-cover
        transition-transform
        duration-500
        group-hover:scale-105
      "

            // Optional: Add blurDataURL for an even better user experience while loading
            // placeholder="blur"
            // blurDataURL="..."
          />
        </div>
      </div>
      {/* ... rest of the card content ... */}
      <div className="flex items-center justify-between py-2 text-brand-white">
        <div className="flex flex-col gap-1 ">
          <p className="text-[16px]">{image.title}</p>
          <p className="text-brand-white/30 text-sm">{image.title}</p>
        </div>
        <div className="flex gap-2">
          {/* Note: In a real app, these icons should be buttons with click handlers */}
          <Download />
          <Trash />
        </div>
      </div>
    </div>
  );
}
