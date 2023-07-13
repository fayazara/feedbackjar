import { eq, and } from "drizzle-orm";
import { useValidation } from "../../utils/validate";
import { deleteProject } from "../../db/query/project";

export default eventHandler(async (event) => {
  const { getId } = useValidation(event);
  const id = await getId();
  const session = await requireUserSession(event);
  const deletedProject = deleteProject(id, session.user.id);

  if (!deletedProject) {
    throw createError({
      statusCode: 404,
      message: "Project not found",
    });
  }
  return deletedProject;
});
