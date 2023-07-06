import { insertUser, getUser } from "../../db/query/users";
import { sendError, createError, sendRedirect } from "h3";
import { Config, Code, GitHubUser } from "@/server/types/github";

async function fetchAccessToken(config: Config, code: Code) {
  try {
    const response: any = await $fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        body: {
          client_id: config.github.clientId,
          client_secret: config.github.clientSecret,
          code,
        },
      }
    );
    if (response.error) {
      throw new Error("Failed to fetch access token");
    }
    return response.access_token;
  } catch (error) {
    throw new Error("Failed to fetch access token");
  }
}

async function fetchGitHubUser(config: Config, accessToken: string) {
  try {
    const ghUser: GitHubUser = await $fetch("https://api.github.com/user", {
      headers: {
        "User-Agent": `Github-OAuth-${config.github.clientId}`,
        Authorization: `token ${accessToken}`,
      },
    });
    if (!ghUser || !ghUser.id) {
      throw new Error("Invalid GitHub user data");
    }
    return {
      id: ghUser.id,
      login: ghUser.login,
      name: ghUser.name,
      email: ghUser.email,
      avatar_url: ghUser.avatar_url,
      html_url: ghUser.html_url,
      twitter_username: ghUser.twitter_username,
      bio: ghUser.bio,
      blog: ghUser.blog,
      company: ghUser.company,
      location: ghUser.location,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch GitHub user");
  }
}

export default eventHandler(async (event) => {
  const config = useRuntimeConfig(event) as Config;

  const { code } = getQuery(event) as { code: Code };

  if (!code) {
    // Redirect to GitHub OAuth page
    let redirectUrl = getRequestURL(event).href;
    // @ts-ignore
    if (!process.dev) {
      redirectUrl = redirectUrl.replace("http://", "https://");
    }

    return sendRedirect(
      event,
      `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${redirectUrl}`
    );
  }

  try {
    const accessToken = await fetchAccessToken(config, code);
    const ghUser = await fetchGitHubUser(config, accessToken);
    const user = await getUser(ghUser.id);
    if (!user) {
      const newUser = await insertUser(ghUser);
      console.log("User inserted", newUser);
    }
    await setUserSession(event, { user });
    return sendRedirect(event, "/dashboard");
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
