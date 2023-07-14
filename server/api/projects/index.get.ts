import { eq, sql } from "drizzle-orm";
import { getProjects } from "../../db/query/project";
import { useValidation } from "../../utils/validate";

export default eventHandler(async (event) => {
  const { getLimit, getOffset } = useValidation(event);

  const limit = await getLimit();
  const offset = await getOffset();

  // TEST
  // const session = await requireUserSession(event);
  // const userId = session.user.id

  const userId = 1

  const projects = await getProjects(
    {
      id: tables.projects.id,
      name: tables.projects.name,
      status: tables.projects.status,
      description: tables.projects.description,
      createdAt: tables.projects.createdAt,
      updatedAt: tables.projects.updatedAt,
      avatar: tables.projects.avatar,
      website: tables.projects.website,
    },
    eq(tables.projects.userId, userId),
    tables.projects.name,
    offset,
    limit
  );

  return projects;
});
