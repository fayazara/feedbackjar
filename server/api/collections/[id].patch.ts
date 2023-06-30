import { eq, and } from "drizzle-orm";
import { useValidatedParams, useValidatedBody, z, zh } from "h3-zod";

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });
  const { name } = await useValidatedBody(event, {
    name: z.string(),
  });
  const { description } = await useValidatedBody(event, {
    description: z.string(),
  });
  const { status } = await useValidatedBody(event, {
    status: z.string(),
  });
  const session = await requireUserSession(event);

  // List todos for the current user
  const todo = await useDb()
    .update(tables.collections)
    .set({
      name,
      description,
      status,
    })
    .where(
      and(
        eq(tables.collections.id, id),
        eq(tables.collections.userId, session.user.id)
      )
    )
    .returning()
    .get();

  return todo;
});
