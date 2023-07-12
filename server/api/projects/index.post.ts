import { useValidatedBody, z } from "h3-zod";

export default eventHandler(async (event) => {
  const { name } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
  });
  const { description } = await useValidatedBody(event, {
    description: z.string().max(300),
  });
  const { status } = await useValidatedBody(event, {
    status: z.string(),
  });
  const session = await requireUserSession(event);

  // list collections for the current user
  const collection = await useDb()
    .insert(tables.projects)
    .values({
      userId: session.user.id,
      name,
      description,
      status,
      createdAt: new Date(),
    })
    .returning()
    .get();

  return collection;
});
