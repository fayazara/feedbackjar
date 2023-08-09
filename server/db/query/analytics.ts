import { sql, eq, and } from "drizzle-orm";

export const getFeedbackCountOfProject = async (
  selectColumns: any,
  filterBy: any
): Promise<any> => {
  const db = await useDb()
    .select(selectColumns)
    .from(tables.feedbacks)
    .where(filterBy);

  return db.all();
};

export const feedbackCountByStatus = async (filterBy: any) =>
  await useDb()
    .select({
      status: tables.feedbacks.status,
      count: sql<number>`count(${tables.feedbacks.id})`,
    })
    .from(tables.feedbacks)
    .where(filterBy)
    .groupBy(tables.feedbacks.status)
    .all();

export const feedbackCountByCategory = async (filterBy: any) =>
  await useDb()
    .select({
      category: tables.feedbacks.category,
      count: sql<number>`count(${tables.feedbacks.id})`,
    })
    .from(tables.feedbacks)
    .where(filterBy)
    .groupBy(tables.feedbacks.category)
    .all();

export const countForStatus = async (userId: number, status: string) =>
  await useDb()
    .select({
      id: tables.feedbacks.id,
    })
    .from(tables.feedbacks)
    .where(
      and(
        eq(tables.feedbacks.userId, userId),
        eq(tables.feedbacks.status, status)
      )
    )
    .all();
