import { onBoardUser } from "../../db/query/users";
import { useValidation } from "../../utils/validate";
import { Project } from "~/lib/types/project";
import { insertProject } from "../../db/query/project";

export default eventHandler(async (event) => {
  const { getName, getDescription, getStatus, getWebsite, getAvatar } =
    useValidation(event);
  const name = await getName();
  const description = await getDescription();
  const status = await getStatus();
  const website = await getWebsite();
  const avatar = await getAvatar();

  const session = await requireUserSession(event);
  const userId = session.user.id;

  if (session.user.onboarded) {
    throw new Error("User is already onboarded");
  }

  const project: Project = await insertProject({
    userId,
    name,
    description,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
    website,
    avatar,
  });

  const user = await onBoardUser(userId);
  await setUserSession(event, { user });
  
  return project;
});
