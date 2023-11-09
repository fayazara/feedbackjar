<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
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
        :projects="projectsDropdown"
      />
    </USlideover>

    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col"
    >
      <DashboardSidebar
        :user="user"
        :clear="clear"
        :closeButton="false"
        :projects="projectsDropdown"
      />
    </div>

    <div
      class="flex sticky top-0 z-40 gap-x-4 justify-between items-center px-4 py-4 h-14 bg-white border-gray-900 shadow-sm md:pl-60 dark:bg-gray-950 dark:border-b sm:px-6"
    >
      <div class="flex gap-x-2 items-center md:hidden">
        <Logo class="w-auto h-6" />
        <p class="text-lg font-medium">Feedbackjar</p>
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
      <NuxtPage v-if="user?.onboarded" />
      <DashboardOnboard v-else />
    </div>
    <UNotifications />
  </div>
  <NuxtLoadingIndicator />
</template>

<script setup>
const { user, clear, loggedIn } = useUserSession();
const { data: projects = [] } = await useFetch(`/api/projects`);
definePageMeta({
  middleware: ["auth"],
});

const projectsDropdown = computed(() => {
  return projects.value.map((project) => {
    return {
      label: project.name,
      avatar: {
        src: project.avatar,
      },
      to: `/dashboard/projects/${project.id}`,
      id: project.id,
    };
  });
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
