"use client";
import Image from "next/image";
import { Download, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import type { ImageCardProps } from "@/types/types";
import { getPreviewUrl } from "@/lib/actions/get-preview-url";

export function SignedImagePreview({
  imageKey,
  imageAlt,
}: {
  imageKey: string;
  imageAlt: string;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true; // what does this mean?

    getPreviewUrl(imageKey).then(({ url }) => {
      if (mounted) setSrc(url);
    });

    return () => {
      mounted = false;
    };
  }, [imageKey]);

  if (!src) return <div>Loading…</div>;
  console.log(src);
  return (
    <img
      src={src}
      alt={imageAlt}
      loading="lazy"
      decoding="async"
      className="
    absolute inset-0
    w-full h-full
    object-cover
    transition-transform
    duration-500
    group-hover:scale-105
  "
    />
  );
}

export function ImageCard({
  image,
  onDelete,
  onEdit,
  onDownload,
}: ImageCardProps) {
  return (
    <div>
      <div className="flex flex-col w-full">
        <div
          className="

        group
        relative
        
        w-full
        aspect-[4/3]
        overflow-hidden
        rounded-2xl
        bg-gradient-to-br
        from-gray-800
        to-gray-900
        ring-1 ring-white/10
        hover:ring-brand-orange
        hover:ring-2
        transition-all
        duration-300
        
        
      "
        >
          <SignedImagePreview
            imageKey={image.imageKey}
            imageAlt={image.title}
          />
          {/* <Image
            src={image.imageKey}
            alt={image.title}
            fill
            sizes="
          (max-width: 640px) 50vw,
          (max-width: 768px) 33vw,
          (max-width: 1024px) 25vw,
          (max-width: 1440px) 20vw,
          16vw
        "
            className="
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
          /> */}
        </div>
      </div>
      <div className="flex items-center justify-between py-2 text-brand-white">
        <div className="flex flex-col gap-2 ">
          <p>{image.title}</p>
          <p>{image.title}</p>
        </div>
        <div className="flex gap-2">
          <Download />
          <Trash />
        </div>
      </div>
    </div>
  );
}
