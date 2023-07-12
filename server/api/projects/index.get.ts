import { eq, sql } from "drizzle-orm";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);
  const projects = await useDb()
    .select({
      id: tables.projects.id,
      name: tables.projects.name,
      status: tables.projects.status,
      description: tables.projects.description,
      createdAt: tables.projects.createdAt,
      emailsCount: sql`COUNT(${tables.feedbacks.id})`,
    })
    .from(tables.projects)
    .leftJoin(
      tables.feedbacks,
      eq(tables.feedbacks.projectId, tables.projects.id)
    )
    .where(eq(tables.projects.userId, session.user.id))
    .groupBy(tables.projects.id)
    .all();

  return projects;
});
