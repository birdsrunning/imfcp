"use server";

import { db } from "@/db";
import { payments, user } from "@/db/schema";
import {
  and,
  ilike,
  eq,
  desc,
  count,
  sql,
  gte,
  lte,
} from "drizzle-orm";

type PaymentStatus = "INITIALIZED" | "SUCCESS" | "FAILED";

type GetAdminPaymentsArgs = {
  page?: number;
  limit?: number;
  q?: string;
  status?: PaymentStatus;
  from?: Date;
  to?: Date;
};

export async function getAdminPayments({
  page = 1,
  limit = 10,
  q,
  status,
  from,
  to,
}: GetAdminPaymentsArgs) {
  try {
    const offset = (page - 1) * limit;
    const conditions = [];

    // 🔎 search by reference
    if (q?.trim()) {
      conditions.push(ilike(payments.reference, `%${q}%`));
    }

    // 📌 status filter
    if (status) {
      conditions.push(eq(payments.status, status));
    }

    // 📅 date range
    if (from) {
      conditions.push(gte(payments.createdAt, from));
    }

    if (to) {
      conditions.push(lte(payments.createdAt, to));
    }

    // 🧾 payments list (limit + 1 for pagination)
    const rows = await db
      .select({
        id: payments.id,
        reference: payments.reference,
        amount: payments.amount,
        currency: payments.currency,
        status: payments.status,
        provider: payments.provider,
        createdAt: payments.createdAt,
        userEmail: user.email,
        userName: user.name,
      })
      .from(payments)
      .innerJoin(user, eq(payments.userId, user.id))
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(payments.createdAt))
      .limit(limit + 1)
      .offset(offset);

    const hasNextPage = rows.length > limit;
    const items = rows.slice(0, limit);

    // 🔢 total count
    const [{ total = 0 }] = await db
      .select({ total: count() })
      .from(payments)
      .where(conditions.length ? and(...conditions) : undefined);

    // 💰 TOTAL REVENUE (SUCCESS only)
    const successConditions = [
      eq(payments.status, "SUCCESS"),
      ...(from ? [gte(payments.createdAt, from)] : []),
      ...(to ? [lte(payments.createdAt, to)] : []),
    ];

    const [{ revenue }] = await db
      .select({
        revenue: sql<number>`COALESCE(SUM(${payments.amount}::numeric), 0)`,
      })
      .from(payments)
      .where(and(...successConditions));

    return {
      items,
      total,
      totalRevenue: revenue, // ✅ NOW EXISTS
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      hasNextPage,
    };
  } catch (err) {
    console.error("getAdminPayments error:", err);

    return {
      items: [],
      total: 0,
      totalRevenue: 0,
      page,
      totalPages: 1,
      hasNextPage: false,
    };
  }
}
