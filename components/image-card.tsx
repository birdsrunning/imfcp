"use client";

import { Download, Trash } from "lucide-react";
import Image from "next/image";
import type { ImageCardProps } from "@/types/types";

export function ImageCard({
  image,
  isAdmin,
}: ImageCardProps & {
  isAdmin: boolean;
  isPaid: boolean;
}) {
  return (
    <article className="flex flex-col gap-3">
      {/* Image */}
      <div className="group relative w-full aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10 hover:ring-brand-orange">
        <Image
          src={`${process.env.NEXT_PUBLIC_THUMBNAIL_CDN}${image.thumbnailUrlKey}`}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3 px-1">
        <div>
          <p className="text-sm font-medium text-white line-clamp-1">
            {image.title}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 text-white/60">
          <button className="hover:text-white transition-colors">
            <Download size={18} />
          </button>

          {/* Delete → admin only */}
          {isAdmin && (
            <button className="hover:text-red-400 transition-colors">
              <Trash size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
