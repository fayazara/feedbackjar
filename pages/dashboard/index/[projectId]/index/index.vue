<template>
  <main>
    <header>
      <div
        class="col-span-full border-b dark:border-white/10 flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-100 dark:bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-x-3">
            <UAvatar
              src="https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png"
              size="2xs"
            />
            <h1 class="flex gap-x-3 text-base leading-7">
              <span class="font-semibold">Dribbble</span>
            </h1>
          </div>
          <p class="mt-1 text-xs leading-6 text-gray-500">
            Feedback collected from the Dribble website
          </p>
        </div>
        <UButton
          label="Add"
          icon="i-heroicons-plus-circle"
          color="white"
        ></UButton>
      </div>
      <div
        class="grid grid-cols-2 lg:grid-cols-6 gap-px bg-gray-200 dark:bg-white/10"
      >
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950"
        >
          <p
            class="text-sm font-medium leading-6 text-gray-600 dark:text-gray-400"
          >
            {{ stat.name }}
          </p>
          <p class="mt-1 sm:mt-2 flex items-baseline gap-x-2">
            <span
              class="text-2xl lg:text-4xl font-semibold tracking-tight text-gray-700 dark:text-white/70"
              >{{ stat.value }}</span
            >
            <span
              v-if="stat.unit"
              class="text-sm text-gray-600 dark:text-gray-400"
              >{{ stat.unit }}</span
            >
          </p>
        </div>
      </div>
    </header>

    <!-- Activity list -->
    <div class="border-t dark:border-white/10 pt-11">
      <h2 class="px-4 text-base font-semibold leading-7 sm:px-6 lg:px-8">
        Latest activity
      </h2>
      <div>
        <UButton @click="isOpen = true">Open</UButton>
        <USlideover v-model="isOpen" :ui="feedbackStylesBase">
          <DashboardFeedbackDetails />
        </USlideover>
      </div>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const { projectId } = route.params;
const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth(), 1);
const { data: projects } = useFetch(
  `/api/projects/${projectId}/overview?start=${start.toISOString()}&end=${today.toISOString()}`
);
const stats = [
  { name: "Total feedbacks", value: "405" },
  { name: "Issues", value: "134" },
  { name: "Ideas", value: "233" },
  { name: "Other", value: "90" },
  { name: "Open", value: "112" },
  { name: "Closed", value: "335" },
];
const feedbackStylesBase = {
  base: "relative flex-1 flex flex-col w-full focus:outline-none m-2 rounded-xl",
};
const isOpen = ref(false);
</script>
