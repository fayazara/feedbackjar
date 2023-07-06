<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <USlideover
      v-model="sidebarOpen"
      side="left"
      :ui="{ width: 'w-screen max-w-xs' }"
    >
      <DashboardSidebar
        @close="sidebarOpen = false"
        closeButton
        :user="user"
        :clear="clear"
      />
    </USlideover>
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <DashboardSidebar :user="user" :clear="clear" />
    </div>

    <div
      class="sticky top-0 z-40 flex items-center justify-between gap-x-4 bg-white dark:bg-gray-950 dark:border-b border-gray-900 px-4 py-4 shadow-sm sm:px-6"
    >
      <div class="flex items-center gap-x-3">
        <Logo class="h-8 w-auto" />
        <p class="font-medium text-lg">Feedbackjar</p>
      </div>
      <div class="flex-grow"></div>
      <UButton
        external
        to="https://github.com/fayazara/feedbackjar"
        target="_blank"
        color="gray"
        variant="ghost"
        icon="i-mdi-github"
      />
      <ThemeToggle />
      <UButton
        class="lg:hidden"
        color="white"
        variant="ghost"
        icon="i-heroicons-bars-3"
        @click="sidebarOpen = true"
      />
    </div>

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <NuxtPage />
      </div>
    </main>
    <UNotifications />
  </div>
</template>

<script setup>
const { user, clear, loggedIn } = useUserSession();
definePageMeta({
  middleware: "auth",
});
const sidebarOpen = ref(false);
watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo("/");
  }
});

useHead({
  title: "Feedbackjar",
  meta: [
    { name: "description", content: "Collect Feedback and Grow your business" },
  ],
});
</script>
