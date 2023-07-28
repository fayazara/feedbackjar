import { useValidation } from "../../utils/validate";
import { Project } from "~/lib/types/project";
import { insertProject } from "../../db/query/project";

export default eventHandler(async (event) => {
  const{ getName, getDescription, getStatus, getWebsite, getAvatar } = useValidation(event)
  const name = await getName()
  const description = await getDescription()
  const status = await getStatus()
  const website = await getWebsite()
  const avatar = await getAvatar()


  const session = await requireUserSession(event);
  const userId = session.user.id

  // const userId = 1

  console.log(userId, name, description, status, website, avatar)
  const project: Project = await insertProject({
    userId,
    name,
    description,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
    website,
    avatar
  })

  return project;
});
