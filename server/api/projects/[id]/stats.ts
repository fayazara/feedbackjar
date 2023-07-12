import { sql } from "drizzle-orm";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);

  const result = await useDb()
    .select({
      numberOfFeedbacks: sql<number>`count(*) as count from tables.feedbacks where userId = ${session.user.id}`,
    })
    .from(tables.projects)
    .get();

  return result;
});
