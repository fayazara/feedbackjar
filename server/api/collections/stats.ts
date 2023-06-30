import { sql } from "drizzle-orm";

export default eventHandler(async () => {
  // Count the total number of collections
  return await useDb()
    .select({
      collections: sql<number>`count(*)`,
      users: sql<number>`count(distinct(${tables.collections.userId}))`,
    })
    .from(tables.collections)
    .get();
});
