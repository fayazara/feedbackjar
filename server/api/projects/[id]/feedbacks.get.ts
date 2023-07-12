import { eq, and } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const session = await requireUserSession(event);

  // Retrieve the collection data and feedbacks using a left join
  const result = await useDb()
    .select()
    .from(tables.projects)
    .leftJoin(
      tables.feedbacks,
      eq(tables.projects.id, tables.feedbacks.projectId)
    )
    .where(
      and(
        eq(tables.projects.id, id),
        eq(tables.projects.userId, session.user.id)
      )
    )
    .all();

  // If the collection is not found, return a 404 error
  if (result.length === 0) {
    throw createError({
      statusCode: 404,
      message: "Collection not found",
    });
  }

  // Extract the collection data and feedbacks from the result
  const collection = result[0].projects;
  const feedbacks = result.map((r) => r.feedbacks).filter((e) => e);

  // Return the collection data and feedbacks
  return {
    collection,
    feedbacks,
  };
});
