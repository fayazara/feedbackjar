import { and, eq } from "drizzle-orm";
import { Project } from "../../types/project";

/**
 * Inserts a project into the database.
 *
 * @param {any} data - The data to insert.
 * @return {Promise<any>} A promise that resolves to the inserted project.
 */
export const insertProject = async (data: any): Promise<any> =>
  await useDb().insert(tables.projects).values(data).returning().get();

/**
 * Retrieves projects from the database based on specified criteria.
 *
 * @param {any} columns - The columns to select from the projects table.
 * @param {any} filterBy - The filters to apply on the projects table.
 * @param {any} orderBy - The order by criteria for the projects table.
 * @param {any} limit - The maximum number of projects to retrieve.
 * @param {any} offset - The offset for the retrieved projects.
 * @return {Promise<any[]>} An array of projects that match the specified criteria.
 */
export const getProjects = async (
  columns: any,
  filterBy: any,
  orderBy: any,
  limit: any,
  offset: any
): Promise<any[]> => // This type needs attention
  await useDb()
    .select(columns)
    .from(tables.projects)
    .where(filterBy)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset)
    .all();

/**
 * Updates a project in the database.
 *
 * @param {any} data - The data to update the project with.
 * @param {any} filterBy - The filter criteria to find the project to update.
 * @return {Promise<Project>} - A promise that resolves to the updated project.
 */
export const updateProject = async (
  data: any,
  filterBy: any
): Promise<Project> => {
  try {
    const updatedProject = await useDb()
      .update(tables.projects)
      .set(data)
      .where(filterBy)
      .returning()
      .get();
    return updatedProject;
  } catch (error) {
    throw new Error("Failed to update project");
  }
};

/**
 * Deletes a project with the given ID.
 *
 * @param {number} id - The ID of the project to delete.
 * @param {number} userId - The ID of the user who owns the project.
 * @return {Promise<void>} - A promise that resolves when the project is deleted.
 */
export const deleteProject = async (
  id: number,
  userId: number
): Promise<any> => {
  try {
    return await useDb()
      .delete(tables.projects)
      .where(
        and(eq(tables.projects.id, id), eq(tables.projects.userId, userId))
      );
  } catch (error) {
    throw new Error("Failed to delete project");
  }
};
