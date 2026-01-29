// components/notifications/notification-bell.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserNotifications } from "@/lib/actions/notifications";
import NotificationBellClient from "./notification-bell-client";

export default async function NotificationBell() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) return null;

  const notifications = await getUserNotifications(session.user.id);

  return (
    <NotificationBellClient
      notifications={notifications}
      userId={session.user.id}
    />
  );
}
