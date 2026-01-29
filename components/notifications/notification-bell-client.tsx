"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { markNotificationAsRead } from "@/lib/actions/notifications";
import type { Notification } from "@/types/types";

function NotificationItem({
  notification,
  userId,
}: {
  notification: Notification;
  userId: string;
}) {
  const commonClass = cn(
    "flex cursor-pointer gap-3 border-b px-4 py-3 text-sm hover:bg-muted",
    !notification.read && "bg-muted/50",
  );

  const content = (
    <div className="flex flex-col gap-0.5">
      <span className="font-medium">{notification.title}</span>
      <span className="text-muted-foreground">{notification.message}</span>
    </div>
  );

  // 🔹 LINK CASE (href is guaranteed)
  if (notification.link) {
    return (
      <Link
        href={notification.link}
        className={commonClass}
        onClick={async () => {
          if (!notification.read) {
            await markNotificationAsRead(notification.id, userId);
          }
        }}
      >
        {content}
      </Link>
    );
  }

  // 🔹 NON-LINK CASE
  return (
    <div
      className={commonClass}
      onClick={async () => {
        if (!notification.read) {
          await markNotificationAsRead(notification.id, userId);
        }
      }}
    >
      {content}
    </div>
  );
}

export default function NotificationBellClient({
  notifications,
  userId,
}: {
  notifications: Notification[];
  userId: string;
}) {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      {/* Bell */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative rounded-full p-2 hover:bg-muted"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-96 overflow-hidden rounded-2xl border bg-background shadow-xl">
          <div className="border-b px-4 py-3 font-semibold">Notifications</div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No notifications yet 👀
              </div>
            )}

            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                userId={userId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
