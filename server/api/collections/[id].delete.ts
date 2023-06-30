import { and, eq } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const session = await requireUserSession(event);

  // delete the specific collection for the user.
  const collection = await useDb()
    .delete(tables.collections)
    .where(
      and(eq(tables.collections.id, id), eq(tables.collections.userId, session.user.id))
    );

  return collection;
});
