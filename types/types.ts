import { auth } from "@/lib/auth";
import { z } from "zod";

// Confirm the use?
export type TImage = {
  id: string;
  userId: string;
  title: string;
  imageKey: string;
  thumbnailUrl: string | null;
  fileType: string;
  fileSize: number;
  width: number;
  height: number;
  category: string;
  orientation: string;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
};

// what's this?
export interface ImageCardProps {
  image: ImageType;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
}

// what's this?
export type TProfile = {
  id: string;
  username: string;
  avatar_url: string | null;
  plan_type: string;
  image_limit: number;
  image_count: number;
  created_at: string;
  updated_at: string;
};

// what's this?
// For typescript the session type
export type Session = typeof auth.$Infer.Session;

// what's this?
// zod userSchema
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// what's this?
// zod userProfile
export const UserProfileSchema = z.object({
  userId: z.string(),
  role: z.enum(["user", "admin"]),
  paymentStatus: z.enum(["free", "paid"]),
  plan: z.string(),
  createdAt: z.date(),
});

// what's this?
export const UserWithProfile = UserSchema.extend({
  profile: UserProfileSchema.nullable(),
});

// what's this?
// zod representation of session
export const sessionSchema = z.object({
  id: z.string(),
  expireAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
});

// what's this?
export const SessionWithUserSchema = sessionSchema.extend({
  user: UserWithProfile.nullable(),
});

// what's this?
export type user = z.infer<typeof UserSchema>;
export type userWithProfile = z.infer<typeof UserWithProfile>;
export type session = z.infer<typeof sessionSchema>;
export type sessionWithUser = z.infer<typeof SessionWithUserSchema>;

export type ImageType ={ id: string; userId: string; title: string; description: string | null; categories: string[]; thumbnailUrlKey: string; originalKey: string; isPremium: boolean; orientation: "landscape" | "portrait"; createdAt: Date; updatedAt: Date; }