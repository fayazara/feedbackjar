import { Feedback } from "~/lib/types/project";

/**
 * Insert feedback into the database.
 *
 * @param {any} data - The data to be inserted.
 * @return {Promise<any>} The result of the insertion.
 */
export const insertFeedback = async (data: any) =>
  await useDb().insert(tables.feedbacks).values(data).returning().get();

/**
 * Retrieves feedbacks from the database based on the given criteria.
 *
 * @param {any} columns - The columns to select from the feedbacks table.
 * @param {any} filterBy - The filter criteria to apply to the feedbacks table.
 * @param {any} orderBy - The order in which to sort the feedbacks.
 * @param {any} limit - The maximum number of feedbacks to retrieve.
 * @param {any} offset - The offset from which to retrieve the feedbacks.
 * @return {Promise<any[]>} A promise that resolves to an array of feedbacks.
 */
export const getFeedbacks = async (
  columns: any,
  filterBy: any,
  orderBy: any,
  offset: any,
  limit: any,
): Promise<any[]> => // This type needs attention
  {
   const db = await useDb()
    .select(columns)
    .from(tables.feedbacks)
    .where(filterBy)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset)
   return db.all();
  }

/**
 * Updates a Feedback based on the provided data and filter criteria.
 *
 * @param {any} data - The data to update the feedback with.
 * @param {any} filterBy - The criteria to filter the feedback by.
 * @return {Promise<Feedback>} A promise that resolves to the updated feedback.
 */
export const updateFeedback = async (
  data: any,
  filterBy: any
): Promise<any> =>
  useDb().update(tables.feedbacks).set(data).where(filterBy).returning().get();
