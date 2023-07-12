import { eq, sql } from "drizzle-orm";
import { Project } from "../../types/project";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);
  const projects: Project[] = useDb()
    .select({
      id: tables.projects.id,
      name: tables.projects.name,
      status: tables.projects.status,
      description: tables.projects.description,
      createdAt: tables.projects.createdAt,
      updatedAt: tables.projects.updatedAt,
      avatar: tables.projects.avatar,
      website: tables.projects.website,
      totalFeedbacks: sql`COUNT(${tables.feedbacks.id})`,
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
