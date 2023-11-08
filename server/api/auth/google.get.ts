import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import { insertUser, getUser } from "../../db/query/users";

function mapGoogleUserToDBUser(payload: any) {
  return {
    name: payload.name,
    email: payload.email,
    avatarUrl: payload.picture,
  };
}

export default oauth.googleEventHandler({
  async onSuccess(event: any, { user }: any) {
    const filterBy = eq(users.email, user.email as string);
    console.log('user,', user)
    let userDb = await getUser(filterBy);
    if (!userDb) {
      userDb = await insertUser(mapGoogleUserToDBUser(user));
    }
    await setUserSession(event, { user: userDb });
    return sendRedirect(event, "/dashboard");
  },
});
