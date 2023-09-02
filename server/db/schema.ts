import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  githubId: integer("github_id").notNull(), // GitHub Id
  login: text("login"),
  name: text("name"),
  email: text("email"),
  avatarUrl: text("avatarUrl"),
  githubUrl: text("githubUrl"),
  githubUsername: text("githubUsername"),
  twitterUsername: text("twitterUsername"),
  bio: text("bio"),
  blog: text("blog"),
  company: text("company"),
  location: text("location"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  status: text("status").notNull().default("active"),
  onboarded: integer("onboarded", { mode: "boolean" }).notNull().default(false),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"), // Active and Archived
  avatar: text("avatar"),
  website: text("website"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const feedbacks = sqliteTable("feedbacks", {
  id: integer("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  message: text("message").notNull(),
  origin: text("origin"),
  user: blob("user", { mode: "json" }),
  country_name: text("country_name"),
  device_details: blob("device_details", { mode: "json" }),
  custom_attributes: blob("custom_attributes  ", { mode: "json" }),
  internal_notes: text("internal_notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  category: text("category").notNull().default("issue"),
  status: text("status").notNull().default("active"),
});
