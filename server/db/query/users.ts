import { eq } from "drizzle-orm";
import { users } from "../schema";

export const allUsers = async () => await useDb().select().from(users).all();

export const getUser = async (filterBy: any) => {
  const results = await useDb().select().from(users).where(filterBy).all();
  return results[0];
};

export const insertUser = async (data: any) => {
  const { name, email, avatarUrl } = data;

  const payload: any = {
    name,
    email,
    avatarUrl,
    createdAt: new Date(),
  };

  try {
    const user = await useDb().insert(users).values(payload).returning().get();
    return user;
  } catch (err) {
    console.log("Failed to create user", err);
    return null;
  }
};

export const onBoardUser = async (userId: number) => {
  const onboardedUser = await useDb()
    .update(tables.users)
    .set({ onboarded: true })
    .where(eq(tables.users.id, userId))
    .returning()
    .get();
  return onboardedUser;
};

export const updateUser = async (data: any, userId: number) => {
  const updatedUser = await useDb()
    .update(tables.users)
    .set(data)
    .where(eq(tables.users.id, userId));
  return updatedUser;
};
