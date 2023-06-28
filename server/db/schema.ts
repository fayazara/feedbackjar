import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull(), // GitHub Id
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
