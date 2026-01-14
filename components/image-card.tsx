"use client";
import { Download, Trash } from "lucide-react";
import Image from "next/image"; // Renamed to avoid confusion with the built-in <img>
import type { ImageCardProps } from "@/types/types";

export function ImageCard({
  image,
  onDelete,
  onEdit,
  onDownload,
}: ImageCardProps) {
  return (
    <article className="flex flex-col gap-3">
      {/* Image */}
      <div
        className="
          group
          relative
          w-full
          aspect-[4/3]
          overflow-hidden
          rounded-2xl
          bg-gradient-to-br from-gray-800 to-gray-900
          ring-1 ring-white/10
          transition-all duration-300
          hover:ring-2 hover:ring-brand-orange
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
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-white line-clamp-1">
            {image.title}
          </p>
          <p className="text-xs text-white/40 line-clamp-1">{image.title}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 text-white/60">
          <button className="hover:text-white transition-colors">
            <Download size={18} />
          </button>
          <button className="hover:text-red-400 transition-colors">
            <Trash size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
