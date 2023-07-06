import { eq } from "drizzle-orm";
import { users } from "../schema";
import { z } from "h3-zod";
import { GitHubUser } from "@/server/types/github";

export const allUsers = async () => await useDb().select().from(users);

export const getUser = async (githubId: number) => {
  const id = z.number().parse(githubId);

  const results = await useDb()
    .select()
    .from(users)
    .where(eq(users.githubId, id))
    .all();
  return results[0];
};

export const insertUser = async (data: GitHubUser) => {
  const {
    id,
    login,
    name,
    email,
    avatar_url,
    twitter_username,
    bio,
    blog,
    company,
    location,
    html_url
  } = data;

  const user = await useDb()
    .insert(users)
    .values({
      createdAt: new Date(),
      githubId: id,
      githubUsername: login,
      name,
      email,
      avatarUrl: avatar_url,
      twitterUsername: twitter_username,
      githubUrl: html_url,
      bio,
      blog,
      company,
      location,
    })
    .returning()
    .get();
  return user;
};

export const updateUser = async (data: any) =>
  await useDb().update(users).set(data);
