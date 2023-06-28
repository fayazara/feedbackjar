import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@nuxtjs/fontaine"],
  ui: {
    icons: ["heroicons", "mdi"],
  },
  runtimeConfig: {
    dbDir: resolve("./server/db"),
    github: {
      clientId: "",
      clientSecret: "",
    },
    session: {
      name: "nuxt-session",
      password: "",
    },
  },

  plugins: ["~/plugins/session.server.ts"],
});
