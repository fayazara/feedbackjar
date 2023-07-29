<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950">
    <USlideover
      v-model="sidebarOpen"
      side="left"
      :ui="{ width: 'w-screen max-w-xs' }"
    >
      <DashboardSidebar
        @close="sidebarOpen = false"
        :closeButton="true"
        :user="user"
        :clear="clear"
      />
    </USlideover>

    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col"
    >
      <DashboardSidebar :user="user" :clear="clear" :closeButton="false" />
    </div>

    <div
      class="sticky h-14 top-0 z-40 md:pl-60 flex items-center justify-between gap-x-4 bg-white dark:bg-gray-950 dark:border-b border-gray-900 px-4 py-4 shadow-sm sm:px-6"
    >
      <div class="flex items-center gap-x-2 md:hidden">
        <Logo class="h-6 w-auto" />
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
        color="gray"
        variant="ghost"
        icon="i-heroicons-bars-3"
        @click="sidebarOpen = true"
      />
    </div>

    <div class="lg:pl-60">
      <NuxtPage v-if="user.onboarded" />
      <DashboardOnboard v-else/>
    </div>
    <UNotifications />
  </div>
</template>

<script setup>
const { user, clear, loggedIn } = useUserSession();

definePageMeta({
  middleware: ["auth"],
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
