import { H3Event } from "h3";
import { useValidatedParams, useValidatedBody, z, zh } from "h3-zod";

export const useValidation = async (event: H3Event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  });

  const { name } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
  });

  const { description } = await useValidatedBody(event, {
    description: z.string().max(300),
  });

  const { status } = await useValidatedBody(event, {
    status: z.string(),
  });

  const { website } = await useValidatedBody(event, {
    website: z.string(),
  });

  const { avatar } = await useValidatedBody(event, {
    avatar: z.string(),
  })

  const { feedback } = await useValidatedBody(event, {
    feedback: z.string(),
  })

  const { userEmail } = await useValidatedBody(event, {
    userEmail: z.string(),
  })

  const { userName } = await useValidatedBody(event, {
    userName: z.string(),
  })

  const { category } = await useValidatedBody(event, {
    category: z.string(),
  })

  const { origin } = await useValidatedBody(event, {
    origin: z.string(),
  })

  const { projectId } = await useValidatedBody(event, {
    projectId: z.number(),
  })

  return {
    id,
    name,
    description,
    status,
    website,
    avatar,
    feedback,
    userEmail,
    userName,
    category,
    origin,
    projectId
  };
};
