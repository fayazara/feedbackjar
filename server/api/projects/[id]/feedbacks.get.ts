import { useValidation } from "../../../utils/validate";
import { desc, eq } from "drizzle-orm";
import { getFeedbacks } from "../../../db/query/feedback";
import { Feedback } from "../../../../lib/types/project";


export default eventHandler(async (event) => {
  const { getPagination, getId } = useValidation(event);
  const { limit, offset } = await getPagination()
  const id = await getId()

  const session = await requireUserSession(event);
  const userId = session.user.id

  // const userId = 1

  const feedbacks: Feedback[] =  await getFeedbacks(
    {
      id: tables.feedbacks.id,
      userId: tables.feedbacks.userId,
      userEmail: tables.feedbacks.userEmail,
      userName: tables.feedbacks.userName,
      category: tables.feedbacks.category,
      projectId: tables.feedbacks.projectId,
      feedback: tables.feedbacks.feedback,
      status: tables.feedbacks.status,
      createdAt: tables.feedbacks.createdAt,
      updatedAt: tables.feedbacks.updatedAt,
    },
    eq(tables.feedbacks.projectId, id),
    desc(tables.feedbacks.updatedAt),
    offset,
    limit
  );

  return feedbacks;
});
