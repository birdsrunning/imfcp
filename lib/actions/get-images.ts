import { db } from "@/db";
import { images } from "@/db/schema";
import { sql, and, ilike, asc, count } from "drizzle-orm";

type Orientation = "landscape" | "portrait";

type GetImagesArgs = {
  categories?: string[];
  q?: string;
  orientation?: Orientation;
  limit?: number;
  page?: number;
};

export async function getImages({
  categories = [],
  q,
  limit = 10,
  page = 1,
}: GetImagesArgs) {
  try {
    const offset = (page - 1) * limit;
    const conditions = [];

    // 🔹 categories (AND)
    if (categories.length > 0) {
      const normalized = categories.map((c) => c.toLowerCase());

      conditions.push(
        sql`${images.categories} @> ${sql.raw(
          `ARRAY[${normalized.map((c) => `'${c}'`).join(",")}]::text[]`
        )}`
      );
    }


    // 🔹 text search
    if (q?.trim()) {
      conditions.push(ilike(images.title, `%${q}%`));
    }

    const result = await db
      .select()
      .from(images)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(asc(images.createdAt))
      .limit(limit + 1)
      .offset(offset);

    const hasNextPage = result.length > limit;
    const items = result.slice(0, limit);

    const [{ total = 0 }] = await db
      .select({ total: count() })
      .from(images)
      .where(conditions.length ? and(...conditions) : undefined);

    return {
      items,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      hasNextPage,
    };
  } catch (err) {
    console.error("Error in getImages:", err);
    return { items: [], total: 0, page, totalPages: 1, hasNextPage: false };
  }
}
