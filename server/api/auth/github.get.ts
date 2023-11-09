import { insertUser, getUser } from "../../db/query/users";
import { sendRedirect } from "h3";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";

function mapGithubUserToDBUser(ghUser: any) {
  return {
    name: ghUser.name,
    email: ghUser.email,
    avatarUrl: ghUser.avatar_url,
  }
}

export default oauth.githubEventHandler({
  async onSuccess(event: any, { user }: any) {
    let redirectTo = "/dashboard";
    const filterBy = eq(users.email, user.email as string);
    let userDb: any = await getUser(filterBy);
    if (!userDb) {
      const mappedUser = mapGithubUserToDBUser(user)
      userDb = await insertUser(mappedUser);
    }

    await setUserSession(event, { user: userDb});
    if (!user.onboarded) redirectTo = "/dashboard";
    return sendRedirect(event, redirectTo);
  },
});
