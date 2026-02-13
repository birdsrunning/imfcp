"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Trash, Pencil } from "lucide-react";
import type { ImageCardProps } from "@/types/types";
import { deleteImage } from "@/lib/actions/delete-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDownloadUrl } from "@/lib/actions/download-handler";

export function ImageCard({
  image,
  isAdmin,
}: ImageCardProps & {
  isAdmin: boolean;
  isPaid: boolean;
}) {
  const router = useRouter();

  async function handleDownload(imageId: string) {
    const res = await getDownloadUrl(imageId);

    if (!res.success || !res.url) return;

    window.location.href = res.url;
  }

  return (
    <article className="flex flex-col gap-3">
      {/* Image Card */}
      <div
        tabIndex={0}
        className="
          group relative mx-auto w-full
          max-w-[420px] sm:max-w-[460px] lg:max-w-[520px]
          aspect-[4/5] overflow-hidden rounded-2xl
          ring-1 ring-white/10
          transition-all
          hover:ring-brand-orange
          focus-within:ring-brand-orange
        "
      >
        {/* Image */}
        <Image
          src={`${process.env.NEXT_PUBLIC_THUMBNAIL_CDN}${image.thumbnailUrlKey}`}
          alt={image.title}
          fill
          sizes="(min-width: 1280px) 520px, (min-width: 1024px) 460px, (min-width: 640px) 420px, 100vw"
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
            group-focus-within:scale-105
          "
          priority={false}
        />

        {/* Dark overlay */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-black/40 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
            group-focus-within:opacity-100
          "
        />

        {/* Action buttons */}
        <div
          className="
            pointer-events-auto absolute inset-x-3 bottom-3
            flex items-center justify-between
            opacity-0 translate-y-2
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-y-0
            group-focus-within:opacity-100 group-focus-within:translate-y-0
          "
        >
          {/* Download (everyone) */}
          <button
            onClick={() => handleDownload(image.id)}
            className="
               bg-brand-orange/70 p-4 rounded-2xl
              text-brand-white backdrop-blur
              transition hover:bg-brand-orange
            "
            aria-label="Download image"
          >
            <Download size={18} />
          </button>

          {/* Admin actions */}
          {isAdmin && (
            <div className="flex gap-2">
              <Link
                href={`/sesame-seed/edit/${image.id}`}
                className="
                  bg-brand-orange/70 p-4 rounded-2xl
                  text-white backdrop-blur
                  transition hover:bg-black
                "
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
                    router.push("/dashboard");
                  }
                }}
                className="
                  rounded-2xl bg-black/70 p-4
                  text-red-400 backdrop-blur
                  transition hover:bg-black
                "
                aria-label="Delete image"
              >
                <Trash size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between gap-3 px-1">
        <p className="text-sm font-medium text-white line-clamp-1">
          {image.title}
        </p>
      </div>
    </article>
  );
}
