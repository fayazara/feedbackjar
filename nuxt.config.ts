import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/fontaine",
    "nuxt-icon",
    "nuxt-auth-utils",
  ],
  ui: {
    icons: ["heroicons", "mdi", "simple-icons"],
  },
  css: ["~/assets/css/font.css"],
  runtimeConfig: {
    dbDir: resolve("./server/db"),
    session: {
      name: "nuxt-session",
      password: "",
    },
    oauth: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET ?? "",
      },
    },
  },
  plugins: ["~/plugins/session.server.ts"],
});
