import { and, eq } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const session = await requireUserSession(event);

  // delete the specific list for the user.
  const list = await useDb()
    .delete(tables.lists)
    .where(
      and(eq(tables.lists.id, id), eq(tables.lists.userId, session.user.id))
    );

  return list;
});
