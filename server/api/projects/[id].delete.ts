import { eq, and } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const session = await requireUserSession(event);

  const deletedCollection = await useDb()
    .delete(tables.projects)
    .where(
      and(
        eq(tables.projects.id, id),
        eq(tables.projects.userId, session.user.id)
      )
    )
    .returning()
    .get();

  if (!deletedCollection) {
    throw createError({
      statusCode: 404,
      message: "Collection not found",
    });
  }
  return deletedCollection;
});
