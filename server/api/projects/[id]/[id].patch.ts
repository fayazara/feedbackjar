import { and, eq } from "drizzle-orm";
import { useValidation } from "../../../utils/validate";
import { updateFeedback } from "../../../db/query/feedback";
import { Feedback } from "../../../../lib/types/project";

export default eventHandler(async (event) => {
  const { getId, getCategory, getStatus } = useValidation(event);
  const id = await getId();
  const category = await getCategory()
  const status = await getStatus()

  const session = await requireUserSession(event);
  const userId = session.user.id;

  // const userId = 1

  const feedback: Feedback = await updateFeedback(
    {
      status,
      category,
      updatedAt: new Date(),
    },
    and(
      eq(tables.feedbacks.id, id),
      eq(tables.feedbacks.userId, userId)
    )
  );

  return feedback;
});
