import { useValidation } from "../../../utils/validate";
import { desc, eq, and, between } from "drizzle-orm";
import { getFeedbacks } from "../../../db/query/feedback";
import { Feedback } from "../../../../lib/types/project";


export default eventHandler(async (event) => {
  const { getPagination, getDateRangeFilter, getId } = useValidation(event);
  const id = await getId()
  const { limit, offset } = await getPagination()
  const { start, end } = await getDateRangeFilter();

  // const session = await requireUserSession(event);
  // const userId = session.user.id

  // const userId = 1

  const filterBy: any = and(
    eq(tables.feedbacks.projectId, id),
    between(tables.feedbacks.createdAt, start, end)
  )

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
    filterBy,
    desc(tables.feedbacks.updatedAt),
    offset,
    limit
  );

  return feedbacks;
});
