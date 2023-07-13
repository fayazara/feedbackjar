import { sql } from "drizzle-orm";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);

  const result = useDb()
    .select({
      numberOfFeedbacks: sql<number>`count(*) as count from tables.feedbacks where userId = ${session.user.id}`,
      countByCategory: sql<number>`count(*) as count from tables.feedbacks where userId = ${session.user.id} group by category`,
      countByStatus: sql<number>`count(*) as count from tables.feedbacks where userId = ${session.user.id} group by status`
    })
    .from(tables.projects)
    .get();

  return result;
});
