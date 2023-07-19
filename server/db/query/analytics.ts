import { and, sql, eq, between } from "drizzle-orm";

export const getFeedbackCountOfProject = async (selectColumns: any, filterBy: any, groupBy: any) =>
  {
    const db = await useDb()
    .select(selectColumns)
    .from(tables.feedbacks)
    .where(filterBy)
    .groupBy(groupBy)

    return db.all()
  }

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
