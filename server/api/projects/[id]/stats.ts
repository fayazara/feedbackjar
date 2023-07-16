import { and, sql, eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  // const session = await requireUserSession(event);
  // const userId = session.user.id;

  const { getProjectId } = useValidation(event);
  const projectId = await getProjectId();

  const stats = await useDb()
    .select({
      total: sql<number>`count(${tables.feedbacks.id})`.mapWith(Number),
      uniqueUsers: sql<number>`count(distinct(${tables.feedbacks.userId}))`,
    })
    .from(tables.feedbacks)
    .where(eq(tables.feedbacks.projectId, projectId))
    .get();

  const countByStatus = await useDb()
    .select({
      status: tables.feedbacks.status,
      count: sql<number>`count(${tables.feedbacks.id})`,
    }).from(tables.feedbacks)
    .where(eq(tables.feedbacks.projectId, projectId))
    .groupBy(tables.feedbacks.status)
    .all();

  const countByCategory = await useDb()
    .select({
      category: tables.feedbacks.category,
      count: sql<number>`count(${tables.feedbacks.id})`,
    }).from(tables.feedbacks)
    .where(eq(tables.feedbacks.projectId, projectId))
    .groupBy(tables.feedbacks.category)
    .all();

  const finalStats = {
    total: stats.total,
    uniqueUsers: stats.uniqueUsers,
    countByStatus,
    countByCategory,
  }

  return finalStats;
});
