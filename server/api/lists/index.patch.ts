import { eq, and } from "drizzle-orm";
import { useValidatedBody, z, zh, useValidatedParams } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const { name } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
  });
  const session = await requireUserSession(event);
  // update the specific list for the user.
  const list = await useDb()
    .update(tables.lists)
    .set({
      name,
    })
    .where(
      and(eq(tables.lists.id, id), eq(tables.lists.userId, session.user.id))
    );

  return list;
});
