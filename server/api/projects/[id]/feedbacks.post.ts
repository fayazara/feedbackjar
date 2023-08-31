import { Feedback } from "../../../../lib/types/project";
import { insertFeedback } from "../../../db/query/feedback";
import { useHelper } from "../../../utils/helper";
import { useValidation } from "../../../utils/validate";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);

  const body = await readBody(event);
  const { getMessage, getCategory, getStatus, getProjectId } = useValidation(body);
  const message = await getMessage();
  const category = await getCategory();
  const status = await getStatus();
  const projectId = await getProjectId();

  const feedbackInstance: Feedback = await insertFeedback({
    message,
    category,
    status,
    projectId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return feedbackInstance;
});
