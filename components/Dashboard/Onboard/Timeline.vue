<template>
  <div class="relative flex gap-x-4" :class="{ 'opacity-50': !active }">
    <div
      v-if="trail"
      class="absolute -bottom-6 left-0 top-0 flex w-6 justify-center"
    >
      <div class="w-px bg-gray-200 dark:bg-gray-800" />
    </div>
    <div
      class="relative flex h-6 w-6 flex-none items-center justify-center bg-gray-50 dark:bg-gray-950"
    >
      <Icon
        :name="
          active ? 'heroicons:check-circle-solid' : 'heroicons:check-circle'
        "
        class="h-5 w-5 flex-shrink-0"
      />
    </div>
    <div class="w-full">
      <div>
        <p
          class="py-0.5 leading-5 text-gray-500 dark:text-gray-300 font-semibold"
        >
          {{ title }}
        </p>
      </div>
      <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  active: Boolean,
  trail: Boolean,
});
</script>
