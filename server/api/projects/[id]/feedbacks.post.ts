import { Feedback } from "../../../../lib/types/project";
import { insertFeedback } from "../../../db/query/feedback";
import { useHelper } from "../../../utils/helper";
import { useValidation } from "../../../utils/validate";

export default eventHandler(async (event) => {
  // const session = await requireUserSession(event);

  const { getMessage, getCategory, getStatus, getProjectId } =
    useValidation(event);
  const message = await getMessage();
  const category = await getCategory();
  const status = await getStatus();
  const projectId = await getProjectId();
  const body = await readBody(event);
  const {
    origin,
    user,
    country_name,
    device_details,
    custom_attributes,
    internal_notes,
  } = body;

  const feedbackInstance: any = await insertFeedback({
    origin,
    user,
    country_name,
    device_details,
    custom_attributes,
    internal_notes,
    message,
    category,
    status,
    projectId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return feedbackInstance;
});
