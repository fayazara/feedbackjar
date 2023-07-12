import { useValidation } from "../../utils/validate";
import { Project } from "../../types/project";

export default eventHandler(async (event) => {
  const validate = useValidation(event)
  const name = (await validate).name;
  const description = (await validate).description;
  const status = (await validate).status;
  const website = (await validate).website;
  const avatar = (await validate).avatar;
  const session = await requireUserSession(event);

  // create project
  const projects: Project = await useDb()
    .insert(tables.projects)
    .values({
      userId: session.user.id,
      name,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      website,
      avatar
    })
    .returning()
    .get();

  return projects;
});
