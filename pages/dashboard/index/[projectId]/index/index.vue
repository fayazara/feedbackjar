<template>
  <main>
    <DashboardProjectsHeader
      :project="project.project"
      :stats="project.stats"
    />

    <div class="border-t dark:border-white/10 pt-11">
      <h2 class="px-4 text-base font-semibold leading-7 sm:px-6 lg:px-8">
        Latest activity
      </h2>
      <div class="pt-4">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-white/10">
          <li
            v-for="feedback in project.feedbacks"
            :key="feedback.id"
            class="relative grid grid-cols-8 gap-6 px-4 py-5 hover:bg-gray-100 dark:hover:bg-gray-900 sm:px-6 lg:px-8"
            @click="toggleFeedbackDetails"
          >
            <div class="min-w-0 flex-grow col-span-6">
              <p class="truncate font-mono text-sm leading-6">
                {{ feedback.message }}
              </p>
            </div>
            <div class="flex items-center gap-x-2 col-span-4 lg:col-span-1">
              <div
                :class="[
                  statuses[feedback.category].class,
                  'flex-none rounded-full p-1',
                ]"
              >
                <div class="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
              <div class="text-sm sm:block">
                {{ statuses[feedback.category].label }}
              </div>
            </div>
            <div class="text-sm sm:block col-span-4 lg:col-span-1">
              {{ timeAgo(feedback.createdAt) }}
            </div>
          </li>
        </ul>
        <!-- <UButton @click="isOpen = true">Open</UButton> -->
        <USlideover v-model="isOpen" :ui="feedbackStylesBase">
          <DashboardFeedbackDetails
            @toggleFeedbackDetails="toggleFeedbackDetails"
          />
        </USlideover>
      </div>
    </div>
  </main>
</template>

<script setup>
import { formatTimeAgo } from "@vueuse/core";
const route = useRoute();
const { projectId } = route.params;
const { data: project } = await useFetch(`/api/projects/${projectId}/overview`);
const feedbackStylesBase = {
  base: "relative flex-1 flex flex-col w-full focus:outline-none m-2 rounded-xl",
};
const isOpen = ref(false);
const toggleFeedbackDetails = () => (isOpen.value = !isOpen.value);
const timeAgo = (date) => formatTimeAgo(new Date(date));

const statuses = {
  Idea: {
    class: "text-sky-400 bg-sky-400/10",
    label: "Idea",
  },
  Issue: {
    class: "text-rose-400 bg-rose-400/10",
    label: "Issue",
  },
  Other: {
    class: "text-yellow-400 bg-yellow-400/10",
    label: "Other",
  },
};
</script>
