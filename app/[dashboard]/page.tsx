export const dynamic = "force-dynamic";

import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getImages } from "@/lib/actions/get-images";
import { ImageGrid } from "@/components/image-grid";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardPagination } from "@/components/dashboard-pagination";

type Orientation = "landscape" | "portrait";

type DashboardSearchParams = {
  q?: string;
  category?: string | string[];
  orientation?: Orientation;
  page?: string;
};

const LIMIT = 10;

export default async function DashboardPage(props: {
  searchParams: DashboardSearchParams | Promise<DashboardSearchParams>;
}) {
  // Await searchParams because in dynamic route it is async
  const searchParams = await props.searchParams;
  console.log(searchParams);

  const q = searchParams.q?.trim() || undefined;
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];
  const orientation = searchParams.orientation || undefined;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/auth");
  }

  const page = Math.max(1, Number(searchParams.page) || 1);

  const data = await getImages({
    q,
    categories,
    orientation,
    page,
    limit: LIMIT,
  });

  return (
    <div className="flex min-h-screen w-full">
      {/* to be tacked scrolltrigger */}

      <main
        className="
    flex-1
    space-y-6
    pt-4
    px-4
    sm:px-6
    lg:px-8
  "
      >
        <DashboardHeader />
        <ImageGrid images={data.items} />
        <DashboardPagination
          page={data.page}
          hasNextPage={data.hasNextPage}
          totalPages={data.totalPages}
        />
      </main>
    </div>
  );
}

// add response that would show response once query returns empty
