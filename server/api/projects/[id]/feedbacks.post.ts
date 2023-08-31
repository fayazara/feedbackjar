import { Feedback } from "../../../../lib/types/project";
import { insertFeedback } from "../../../db/query/feedback";
import { useHelper } from "../../../utils/helper";
import { useValidation } from "../../../utils/validate";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const projectId = getRouterParam(event, "id");
  const session = await requireUserSession(event);
  const userId = session?.user?.id;

  const feedbackInstance: Feedback = await insertFeedback({
    ...body,
    projectId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return feedbackInstance;
});
