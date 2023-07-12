import { eq, and } from "drizzle-orm";
import { useValidation } from "../../utils/validate";
import { deleteProject } from "../../db/query/project";

export default eventHandler(async (event) => {
  const validate = useValidation(event);
  const id = (await validate).id;
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
