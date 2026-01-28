"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Trash, Pencil } from "lucide-react";
import type { ImageCardProps } from "@/types/types";
import { deleteImage } from "@/lib/actions/delete-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ImageCard({
  image,
  isAdmin,
}: ImageCardProps & {
  isAdmin: boolean;
  isPaid: boolean;
}) {
  const router = useRouter();
  return (
    <article className="flex flex-col gap-3">
      {/* Image */}
      <div className="group relative w-full aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 hover:ring-brand-orange">
        <Image
          src={`${process.env.NEXT_PUBLIC_THUMBNAIL_CDN}${image.thumbnailUrlKey}`}
          alt={image.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3 px-1">
        <p className="text-sm font-medium text-white line-clamp-1">
          {image.title}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 text-white/60">
          {/* Users AND admins can download */}
          <button
            className="hover:text-white transition-colors"
            aria-label="Download image"
          >
            <Download size={18} />
          </button>

          {/* Admin only */}
          {isAdmin && (
            <>
              <Link
                href={`/sesame-seed/edit/${image.id}`}
                className="hover:text-brand-orange transition-colors"
                aria-label="Edit image"
              >
                <Pencil size={18} />
              </Link>

              <button
                onClick={async () => {
                  const res = await deleteImage(image.id);
                  if (!res.success) {
                    toast.error(res.message);
                    router.push("/dashboard");
                  } else {
                    toast.success("Image deleted");
                  }
                }}
                className="hover:text-red-400 transition-colors"
                aria-label="Delete image"
              >
                <Trash size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
