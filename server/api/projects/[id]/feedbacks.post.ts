import { Feedback } from "../../../types/project";
import { useHelper } from "../../../utils/helper";
import { useValidation } from "../../../utils/validate";


export default eventHandler(async (event) => {
  const validate = useValidation(event);
  const feedback = (await validate).feedback;
  const userEmail = (await validate).userEmail;
  const userName = (await validate).userName;
  const category = (await validate).category;
  const status = (await validate).status;
  const projectId = (await validate).projectId;

  const origin = useHelper().getBrowser(event);
  const session = await requireUserSession(event);

  const feedbackInstance: Feedback = await useDb()
    .insert(tables.feedbacks)
    .values({
        feedback,
        userEmail,
        userName,
        category,
        status,
        origin,
        projectId,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: session?.user?.id
    })
    .returning()
    .get();

  return feedbackInstance;
});
