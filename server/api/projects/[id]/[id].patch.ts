import { and, eq } from "drizzle-orm";
import { useValidation } from "../../../utils/validate";
import { updateFeedback } from "../../../db/query/feedback";
import { Feedback } from "../../../types/project";

export default eventHandler(async (event) => {
  const validate = useValidation(event);
  const id = (await validate).id;
  const category = (await validate).category;
  const status = (await validate).status;

  const session = await requireUserSession(event);

  const feedback: Feedback = await updateFeedback(
    {
      status,
      category,
      updatedAt: new Date(),
    },
    and(
      eq(tables.feedbacks.id, id),
      eq(tables.feedbacks.userId, session.user.id)
    )
  );

  return feedback;
});
