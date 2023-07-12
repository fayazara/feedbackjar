import { eq } from "drizzle-orm";
import { useValidation } from "../../../utils/validate";


export default eventHandler(async (event) => {

  const validate = useValidation(event)
  const id = (await validate).id;
  const category = (await validate).category;
  const status = (await validate).status;

  const session = await requireUserSession(event);

  const todo = await useDb()
    .update(tables.feedbacks)
    .set({
      status,
      category,
      updatedAt: new Date(),
    })
    .where(eq(tables.feedbacks.id, id))
    .returning()
    .get()

  return todo;
});
