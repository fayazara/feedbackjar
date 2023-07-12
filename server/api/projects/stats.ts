import { sql } from "drizzle-orm";

export default eventHandler(async () => {
  // Count the total number of projects
  return await useDb()
    .select({
      users: sql<number>`count(distinct(${tables.projects.userId}))`,
      projects: sql<number>`count(*)`,
    })
    .from(tables.projects)
    .get();
});
