import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  try {
    const session = await requireUserSession(event)
    const projects = await useDb()
      .select()
      .from(tables.projects)
      .where(eq(tables.projects.userId, session.user.id))
      .all();

    return projects;
  } catch (error) {
    console.log(error);
  }
});
