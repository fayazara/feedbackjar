import { insertUser, getUser } from "../../db/query/users";
import { sendError, createError, sendRedirect } from "h3";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { Config } from "../../../lib/types/google";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

async function verifyAccessToken(config: Config, credential: string) {
  const client = new OAuth2Client(config.public.google.clientId);

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: config.public.google.clientId,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error(`No payload`);
  return payload;
}

function mapGoogleUserToDBUser(payload: TokenPayload) {
  return {
    name: payload.name,
    email: payload.email,
    avatarUrl: payload.picture,
    id: new Date().getTime(), // mapped to github user id
  };
}

export default eventHandler(async (event) => {
  const config = useRuntimeConfig(event) as unknown as Config;
  const body = await readBody(event);

  try {
    let redirectTo = "/dashboard";
    const payload = await verifyAccessToken(config, body.credential);
    const filterBy = eq(users.email, payload.email as string);
    let user = await getUser(filterBy);
    if (!user) {
      user = await insertUser(mapGoogleUserToDBUser(payload));
    }
    const userSession = await setUserSession(event, { user });
    console.log('userSession', userSession)
    if (!user.onboarded) redirectTo = "/dashboard";
    return {
      redirectTo,
    }
  } catch (error) {
    console.error(error);
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
        data: error,
      })
    );
  }
});
