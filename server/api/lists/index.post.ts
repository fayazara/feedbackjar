import { useValidatedBody, z } from "h3-zod";

export default eventHandler(async (event) => {
  const { name } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
  });
  const session = await requireUserSession(event);

  // List lists for the current user
  const list = await useDb()
    .insert(tables.lists)
    .values({
      userId: session.user.id,
      name,
      createdAt: new Date(),
    })
    .returning()
    .get();

  return list;
});
