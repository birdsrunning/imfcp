// "use server";

// import { db } from "@/db";
// import { userProfile } from "@/db/schema";
// import { and, ilike, asc, count, gte, lte } from "drizzle-orm";

// type GetUsersArgs = {
//   page?: number;
//   limit?: number;
//   q?: string;
//   from?: Date;
//   to?: Date;
// };

// export async function getAdminUsers({
//   page = 1,
//   limit = 10,
//   q,
//   from,
//   to,
// }: GetUsersArgs) {
//   const offset = (page - 1) * limit;
//   const conditions = [];

//   if (q?.trim()) {
//     conditions.push(
//       ilike(userProfile.email, `%${q}%`)
//     );
//   }

//   if (from) {
//     conditions.push(gte(userProfile.createdAt, from));
//   }

//   if (to) {
//     conditions.push(lte(userProfile.createdAt, to));
//   }

//   const items = await db
//     .select({
//       id: userProfile.id,
//       email: userProfile.email,
//       name: userProfile.name,
//       role: userProfile.role,
//       paymentStatus: userProfile.paymentStatus,
//       createdAt: userProfile.createdAt,
//     })
//     .from(userProfile)
//     .where(conditions.length ? and(...conditions) : undefined)
//     .orderBy(asc(userProfile.createdAt))
//     .limit(limit + 1)
//     .offset(offset);

//   const hasNextPage = items.length > limit;

//   const [{ total }] = await db
//     .select({ total: count() })
//     .from(users)
//     .where(conditions.length ? and(...conditions) : undefined);

//   return {
//     items: items.slice(0, limit),
//     total,
//     page,
//     totalPages: Math.max(1, Math.ceil(total / limit)),
//     hasNextPage,
//   };
// }
