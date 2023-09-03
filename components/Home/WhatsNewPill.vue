<template>
  <NuxtLink
    to="/"
    class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-200 dark:ring-white/10 bg-gray-50 dark:bg-gray-900 dark:text-gray-300"
  >
    <div class="flex-none rounded-full p-1 text-indigo-500 bg-indigo-200/10">
      <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
    </div>
    {{ text }}
    &rarr;
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
