import { useValidation } from "../../../utils/validate";
import { Feedback } from "../../../types/project";
import { desc, eq } from "drizzle-orm";
import { getFeedbacks } from "../../../db/query/feedback";

export default eventHandler(async (event) => {
  const validate = useValidation(event);
  const limit = (await validate).limit;
  const offset = (await validate).offset;
  const id = (await validate).id;
  const session = await requireUserSession(event);

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
    eq(tables.projects.id, id),
    desc(tables.feedbacks.updatedAt),
    offset,
    limit
  );

  return feedbacks;
});
