<template>
  <header>
    <div
      class="col-span-full border-b dark:border-white/10 flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-100 dark:bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
    >
      <div>
        <div class="flex items-center gap-x-3">
          <UAvatar
            :src="project.avatar"
            size="sm"
            class="ring-white/10 ring-2"
          />
          <h1 class="flex gap-x-3 text-base leading-7">
            <span class="font-semibold">{{ project.name }}</span>
          </h1>
        </div>
        <p class="mt-1 text-xs leading-6 text-gray-500">
          {{ project.description }}
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
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
  },
});
const stats = computed(() => {
  return [
    { name: "Total feedbacks", value: props.stats?.feedbackCount },
    { name: "Ideas", value: props.stats?.Idea || 0 },
    { name: "Issues", value: props.stats?.Issue || 0 },
    { name: "Other", value: props.stats?.Other || 0 },
    { name: "Open", value: props.stats?.Active || 0 },
    { name: "Closed", value: props.stats?.closed || 0 },
  ];
});
</script>
