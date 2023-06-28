import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);
  const lists = await useDb()
    .select()
    .from(tables.lists)
    .where(eq(tables.lists.userId, session.user.id))
    .all();
  return lists;
});
