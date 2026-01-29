// lib/notifications.ts
"use server";

import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

import crypto from "crypto";

type NotificationType = "info" | "success" | "error";

interface CreateNotificationArgs {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type = "info",
  link,
}: CreateNotificationArgs) {
  if (!userId) {
    throw new Error("createNotification: userId is required");
  }

  await db.insert(notifications).values({
    id: crypto.randomUUID(),
    userId,
    title,
    message,
    type,
    link,
  });
}

export async function createBulkNotifications(
  userIds: string[],
  data: Omit<CreateNotificationArgs, "userId">,
) {
  if (!userIds.length) return;

  await db.insert(notifications).values(
    userIds.map((userId) => ({
      id: crypto.randomUUID(),
      userId,
      title: data.title,
      message: data.message,
      type: data.type ?? "info",
      link: data.link,
    })),
  );
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string,
) {
  await db
    .update(notifications)
    .set({ read: true })
    .where(
      and(
        eq(notifications.id, notificationId),
        eq(notifications.userId, userId),
      ),
    );
}

export async function markAllNotificationsAsRead(userId: string) {
  await db
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.userId, userId));
}

export async function getUserNotifications(userId: string) {
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(20);
}

export async function getUnreadNotificationCount(userId: string) {
  const result = await db
    .select()
    .from(notifications)
    .where(
      eq(notifications.userId, userId),
    );

  return result.filter((n) => !n.read).length;
}
