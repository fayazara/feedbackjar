import { eq, and } from "drizzle-orm";
import { useValidation } from "../../utils/validate";

export default eventHandler(async (event) => {

  const validate = useValidation(event);
  const id = (await validate).id;
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
