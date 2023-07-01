import { eq, and } from "drizzle-orm";
import { useValidatedParams, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const session = await requireUserSession(event);

  // Retrieve the collection data and emails using a left join
  const result = await useDb()
    .select()
    .from(tables.collections)
    .leftJoin(
      tables.emails,
      eq(tables.collections.id, tables.emails.collectionId)
    )
    .where(
      and(
        eq(tables.collections.id, id),
        eq(tables.collections.userId, session.user.id)
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

  // Extract the collection data and emails from the result
  const collection = result[0].collections;
  const emails = result.map((r) => r.emails).filter((e) => e);

  // Return the collection data and emails
  return {
    collection,
    emails,
  };
});
