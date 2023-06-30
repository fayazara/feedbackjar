<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-950">
    <nav
      class="bg-white dark:bg-slate-950 border-b dark:border-slate-800 shadow-sm"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <UIcon name="i-heroicons-envelope" class="text-3xl" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="link in links"
                :key="link.url"
                :to="link.url"
                class="nav-link"
                >{{ link.name }}</NuxtLink
              >
            </div>
          </div>

          <div class="-mr-2 flex items-center space-x-4">
            <ThemeToggle />
            <DashboardProfileDropdown
              :user="user"
              :clear="clear"
              :links="links"
            />
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <NuxtPage />
    </div>
    <UNotifications />
  </div>
</template>

<script setup>
const { user, clear, loggedIn } = useUserSession();
definePageMeta({
  middleware: "auth",
});

const links = [
  {
    name: "Collections",
    url: "/dashboard",
  },
  {
    name: "Billing",
    url: "/dashboard/billing",
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
  },
];

const colorMode = useColorMode();

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo("/");
  }
});

useHead({
  title: "EmailJar",
  meta: [{ name: "description", content: "Save Email Links" }],
});
</script>

<style scoped>
.nav-link {
  @apply border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-600 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium;
}

.nav-link.router-link-exact-active {
  @apply border-indigo-500 text-slate-900 dark:text-slate-100;
}
</style>
