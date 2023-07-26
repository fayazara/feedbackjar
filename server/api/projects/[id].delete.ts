import { useValidation } from "../../utils/validate";
import { archiveProject } from "../../db/query/project";

export default eventHandler(async (event) => {
  const { getId } = useValidation(event);
  const id = await getId();
  const session = await requireUserSession(event);
  const deletedProject = archiveProject(id, session.user.id);

  if (!deletedProject) {
    throw createError({
      statusCode: 404,
      message: "Project not found",
    });
  }
  return deletedProject;
});
