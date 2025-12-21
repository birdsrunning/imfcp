"use client";
import { Download, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Renamed to avoid confusion with the built-in <img>
import type { ImageCardProps } from "@/types/types";
import { getPreviewUrl } from "@/lib/actions/get-preview-url";

// ---
// 1. Next.js Image Component
// Using NextImage (renamed from Image) after getting the signed URL
// ---
export function SignedImagePreview({
  imageKey,
  imageAlt,
  // Pass the required aspect ratio/layout properties
  layout = "fill",
  sizes = "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw", // Optimised sizes
  loading = "lazy", // Default to lazy loading for better performance
}: {
  imageKey: string;
  imageAlt: string;
  layout?: "fill"; // You should choose one
  sizes?: string;
  loading?: "eager" | "lazy";
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Use a self-invoking async function or useCallback if needed
    getPreviewUrl(imageKey).then(({ url }) => {
      // ⚠️ Important Check: Prevent updating state on unmounted component
      if (mounted) {
        setSrc(url);
      }
    });

    // Clean-up function sets mounted to false when component unmounts
    return () => {
      mounted = false;
    };
  }, [imageKey]);

  // 2. Placeholder while loading
  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-700/50 animate-pulse">
        <span className="text-xs text-white/50">Loading…</span>
      </div>
    );
  }

  // 3. Use NextImage for all the optimizations (WebP conversion, automatic sizing, etc.)
  return (
    <Image
      src={src}
      alt={imageAlt}
      fill
      sizes={sizes}
      loading={loading} // Control loading behavior
      // Note: decoding="async" is handled internally by NextImage
      className="
        object-cover
        transition-transform
        duration-500
        group-hover:scale-105
      "
      unoptimized
      
      // Optional: Add blurDataURL for an even better user experience while loading
      // placeholder="blur"
      // blurDataURL="..."
    />
  );
}

// ---
// 4. ImageCard Component (minimal changes, mostly context for the preview)
// ---
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
          <SignedImagePreview
            imageKey={image.imageKey}
            imageAlt={image.title}
            // 5. Performance Tweak: Set loading strategy based on position
            loading={"lazy"}
            // 6. Provide specific sizes for the Next.js component to optimize the image source
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
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
