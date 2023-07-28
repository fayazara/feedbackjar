import { and, eq } from "drizzle-orm";
import { getProjects } from "../../db/query/project";
import { useValidation } from "../../utils/validate";

export default eventHandler(async (event) => {
  const { getProjectListFilters, getDateRangeFilter, getPagination } =
    useValidation(event);

  const filterParams = await getProjectListFilters();
  const { limit, offset } = await getPagination();

  // TEST
  const session = await requireUserSession(event);
  const userId = session.user.id;

  // const userId = 1

  let filterBy: any = and(eq(tables.projects.userId, userId));
  if (filterParams.status) {
    filterBy = and(filterBy, eq(tables.projects.status, filterParams.status));
  }

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
    filterBy,
    tables.projects.name,
    offset,
    limit
  );

  return projects;
});
