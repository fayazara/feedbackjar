import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const feedbacks = sqliteTable("feedbacks", {
  id: integer("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  feedback: text("feedback").notNull(),
  userEmail: text("user_email").notNull(),
  userName: text("user_name").notNull(),
  category: text("category").notNull().default("issue"),
  status: text("status").notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  origin: text("origin").notNull(),
});
