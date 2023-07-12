import { eq, and } from "drizzle-orm";
import { useValidation } from "../../utils/validate";
import { Project } from "../../types/project";
import { updateProject } from "../../db/query/project";

export default eventHandler(async (event) => {

  const validate = useValidation(event)
  const id = (await validate).id;
  const name = (await validate).name;
  const description = (await validate).description;
  const status = (await validate).status;
  const website = (await validate).website;
  const session = await requireUserSession(event);

  const project: Project = await updateProject({
    name,
    description,
    status,
    website,
    updatedAt: new Date(),
  }, and(
    eq(tables.projects.id, id),
    eq(tables.projects.userId, session.user.id)
  ));

  return project;
});
