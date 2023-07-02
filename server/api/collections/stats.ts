import { sql } from "drizzle-orm";

export default eventHandler(async () => {
  // Count the total number of collections
  return await useDb()
    .select({
      users: sql<number>`count(distinct(${tables.collections.userId}))`,
      collections: sql<number>`count(*)`,
    })
    .from(tables.collections)
    .get();
});
