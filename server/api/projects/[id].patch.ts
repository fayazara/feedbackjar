import { eq, and } from "drizzle-orm";
import { useValidation } from "../../utils/validate";
import { Project } from "../../types/project";
import { updateProject } from "../../db/query/project";

export default eventHandler(async (event) => {

  const { getId, getName, getDescription, getStatus, getWebsite, getAvatar } = useValidation(event)
  const id = await getId()
  const name = await getName()
  const description = await getDescription()
  const status = await getStatus()
  const website = await getWebsite()
  const avatar = await getAvatar()

  // const session = await requireUserSession(event);
  // const userId = session.user.id

  const userId = 1

  const project: Project = await updateProject({
    name,
    description,
    status,
    website,
    avatar,
    updatedAt: new Date(),
  }, and(
    eq(tables.projects.id, id),
    eq(tables.projects.userId, userId)
  ));

  return project;
});
