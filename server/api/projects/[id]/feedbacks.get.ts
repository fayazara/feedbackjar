import { eq, and } from "drizzle-orm";
import { useValidation } from "../../../utils/validate";
import { Feedback } from "../../../types/project";

export default eventHandler(async (event) => {
  const validate = useValidation(event);
  const id = (await validate).id;
  const session = await requireUserSession(event);

  const feedbacks: Feedback[] = await useDb()
    .select()
    .from(tables.feedbacks)
    .where(
      and(
        eq(tables.projects.id, id),
        eq(tables.projects.userId, session.user.id)
      )
    )
    .all();

  return {
    feedbacks,
  };
});
