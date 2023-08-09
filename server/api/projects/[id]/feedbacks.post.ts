import { Feedback } from "../../../../lib/types/project";
import { insertFeedback } from "../../../db/query/feedback";
import { useHelper } from "../../../utils/helper";
import { useValidation } from "../../../utils/validate";


export default eventHandler(async (event) => {
  const { getUserEmail, getUserName, getCategory, getStatus, getProjectId, getFeedback } = useValidation(event);
  const feedback = await getFeedback()
  const userEmail = await getUserEmail()
  const userName = await getUserName()
  const category = await getCategory()
  const status = await getStatus()
  const projectId = await getProjectId()
  const origin = useHelper().getBrowser(event);

  const session = await requireUserSession(event);
  const userId = session?.user?.id

  const feedbackInstance: Feedback = await insertFeedback({
    feedback,
    userEmail,
    userName,
    category,
    status,
    origin,
    projectId,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId
  });

  return feedbackInstance;
});
