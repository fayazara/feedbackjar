import { sql } from "drizzle-orm";

export default eventHandler(async () => {
  return await useDb()
    .select({
      users: sql<number>`count(distinct(${tables.feedbacks.id}))`,
      projects: sql<number>`count(*)`,
    })
    .from(tables.projects)
    .get();
});
