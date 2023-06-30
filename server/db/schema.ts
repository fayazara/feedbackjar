import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const collections = sqliteTable("collections", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(), // GitHub Id
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const emails = sqliteTable("emails", {
  id: integer("id").primaryKey(),
  collectionId: integer("collection_id")
    .references(() => collections.id)
    .notNull(),
  emailId: text("email_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  status: text("status").notNull().default("active"),
  origin: text("origin").notNull(),
});
