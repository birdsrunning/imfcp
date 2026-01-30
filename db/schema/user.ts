import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";

import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const paymentStatusEnum = pgEnum("payment_status", ["free", "paid"]);

export const accessTierEnum = pgEnum("access_tier", ["free", "premium"]);

export const paymentStateEnum = pgEnum("payment_state", [
  "INITIALIZED",
  "SUCCESS",
  "FAILED",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "info",
  "success",
  "error",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const clientQuestions = pgTable("client_questions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  category: text("category").notNull(),
  message: text("message").notNull(),

  reply: text("reply"),                 // your response
  replied: boolean("replied").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  repliedAt: timestamp("replied_at"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userProfile = pgTable("user_profile", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),

  role: userRoleEnum("role").notNull().default("user"),

  paymentStatus: paymentStatusEnum("payment_status").notNull().default("free"),

  plan: text("plan").default("free"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable(
  "payments",
  {
    id: text("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    reference: text("reference").notNull().unique(),

    amount: text("amount").notNull(), // store as string or integer (kobo)
    currency: text("currency").default("NGN").notNull(),

    provider: text("provider").default("paystack").notNull(),

    status: paymentStateEnum("status").default("INITIALIZED").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("payments_userId_idx").on(table.userId),
    index("payments_reference_idx").on(table.reference),
  ],
);

export const images = pgTable("images", {
  id: text("id").primaryKey(), // unique id for the image, e.g., UUID
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }), // link to user
  title: text("title").notNull(),

  description: text("description"),

  // array of strings ✅
  categories: text("categories").array().notNull(),

  thumbnailUrlKey: text("thumbnail_key").notNull(),

  originalKey: text("original_key").notNull(),

  // access control (replaces isPremium)
  accessTier: accessTierEnum("access_tier").default("free").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const notifications = pgTable(
  "notifications",
  {
    id: text("id").primaryKey(), // uuid / cuid

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    title: text("title").notNull(),

    message: text("message").notNull(),

    type: notificationTypeEnum("type").notNull().default("info"),

    link: text("link"), // optional: /billing, /account, etc

    read: boolean("read").notNull().default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("notifications_userId_idx").on(table.userId),
    index("notifications_read_idx").on(table.read),
  ],
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("newsletter_email_idx").on(table.email)],
);

export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(), // IP or IP+action
  count: text("count").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Relation from image → user
export const userImageRelations = relations(images, ({ one }) => ({
  user: one(user, {
    fields: [images.userId],
    references: [user.id],
  }),
}));

// Add images relation in user (optional)
export const userRelationsWithImages = relations(user, ({ many }) => ({
  images: many(images),
}));

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id],
  }),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  notifications: many(notifications),

  // Adding this block to enable querying profile from the user side
  profile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const paymentRelations = relations(payments, ({ one }) => ({
  user: one(user, {
    fields: [payments.userId],
    references: [user.id],
  }),
}));

export const userRelationsWithPayments = relations(user, ({ many }) => ({
  payments: many(payments),
}));
