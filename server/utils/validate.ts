import { useValidatedParams, useValidatedBody, useSafeValidatedQuery, z, zh, useSafeValidatedParams, useValidatedQuery } from "h3-zod";

export const useValidation = (event: any) => {

  const getId = async () => {
    const { id } = await useValidatedParams(event, {
      id: zh.intAsString,
    });
    return id
  };

  const getName = async () => {
    const { name } = await useValidatedBody(event, {
      name: z.string().min(1).max(100),
    });
    return name
  };

  const getDescription = async () => {
    const { description } = await useValidatedBody(event, {
      description: z.string().max(300),
    });
    return description
  }

  const getStatus = async () => {
    const { status } = await useValidatedBody(event, {
      status: z.string(),
    });
    return status
  }

  const getWebsite = async () => {
    const { website } = await useValidatedBody(event, {
      website: z.string(),
    });
    return website
  }

  const getAvatar = async () => {
    const { avatar } = await useValidatedBody(event, {
      avatar: z.string(),
    });
    return avatar
  }

  const getFeedback = async () => {
    const { feedback } = await useValidatedBody(event, {
      feedback: z.string(),
    });
    return feedback
  }

  const getUserEmail = async () => {
    const { userEmail } = await useValidatedBody(event, {
      userEmail: z.string(),
    });
    return userEmail
  }

  const getUserName = async () => {
    const { userName } = await useValidatedBody(event, {
      userName: z.string(),
    });
    return userName
  }

  const getCategory = async () => {
    const { category } = await useValidatedBody(event, {
      category: z.string(),
    });
    return category
  }

  const getOrigin = async () => {
    const { origin } = await useValidatedBody(event, {
      origin: z.string(),
    });
    return origin
  }

  const getProjectId = async () => {
    const { projectId } = await useValidatedBody(event, {
      projectId: z.number(),
    });
    return projectId
  }

  const getLimit = async () => {
    const { success } = await useSafeValidatedQuery(event, {
      limit: zh.intAsString,
    });
    return success ? event.limit : 10
  }

  const getOffset = async () => {
    const { offset } = await useValidatedQuery(event, {
      offset: zh.intAsString,
    });
    return offset
  }

  return {
    getId,
    getName,
    getDescription,
    getStatus,
    getWebsite,
    getAvatar,
    getFeedback,
    getUserEmail,
    getUserName,
    getCategory,
    getOrigin,
    getProjectId,
    getLimit,
    getOffset
  };
};
