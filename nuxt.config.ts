import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@nuxtjs/fontaine", "nuxt-icon"],
  ui: {
    icons: ["heroicons", "mdi"],
  },
  css: ["~/assets/css/font.css"],
  runtimeConfig: {
    dbDir: resolve("./server/db"),
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    session: {
      name: "nuxt-session",
      password: "",
    },
    public: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      },
    },
  },

  plugins: ["~/plugins/session.server.ts"],
});
