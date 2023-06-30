import { eq, sql } from "drizzle-orm";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);
  const collections = await useDb()
    .select({
      id: tables.collections.id,
      name: tables.collections.name,
      status: tables.collections.status,
      description: tables.collections.description,
      createdAt: tables.collections.createdAt,
      emailsCount: sql`COUNT(${tables.emails.id})`,
    })
    .from(tables.collections)
    .leftJoin(
      tables.emails,
      eq(tables.emails.collectionId, tables.collections.id)
    )
    .where(eq(tables.collections.userId, session.user.id))
    .groupBy(tables.collections.id)
    .all();

  return collections;
});
