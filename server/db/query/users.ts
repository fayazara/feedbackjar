import { eq } from "drizzle-orm";
import { users } from "../schema";
import { z } from "h3-zod";
import { GithubUser } from "@/lib/types/github";

export const allUsers = async () => await useDb().select().from(users).all();

export const getUser = async (githubId: number) => {
  const id = z.number().parse(githubId);

  const results = await useDb()
    .select()
    .from(users)
    .where(eq(users.githubId, id))
    .all();
  return results[0];
};

export const insertUser = async (data: GithubUser) => {
  const {
    id,
    login,
    name,
    email,
    avatarUrl,
    twitterUsername,
    bio,
    blog,
    company,
    location,
    githubUrl,
  } = data;

  const user = await useDb()
    .insert(users)
    .values({
      createdAt: new Date(),
      githubId: id,
      githubUsername: login,
      name,
      email,
      avatarUrl: avatarUrl,
      twitterUsername: twitterUsername,
      githubUrl: githubUrl,
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
