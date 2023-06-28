import { lists } from "./../../db/schema";
import { sql } from "drizzle-orm";

export default eventHandler(async () => {
  // Count the total number of lists
  return await useDb()
    .select({
      lists: sql<number>`count(*)`,
      users: sql<number>`count(distinct(${tables.lists.userId}))`,
    })
    .from(tables.lists)
    .get();
});
