import { createResolver } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxthq/ui", "@vueuse/nuxt", "@nuxtjs/fontaine", "nuxt-icon"],
  ui: {
    icons: ["heroicons", "mdi"],
  },
  runtimeConfig: {
    dbDir: resolve("./server/db"),
    github: {
      clientId: "680885af064a157b870c",
      clientSecret: "3a21b84ca0eba1197c33f3a4bf6dbf1fb0f558ab",
    },
    session: {
      name: "nuxt-session",
      password: "",
    },
  },

  plugins: ["~/plugins/session.server.ts"],
});
