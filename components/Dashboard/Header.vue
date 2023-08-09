<template>
  <header class="mx-auto max-w-4xl flex items-center justify-between">
    <div>
      <h1
        class="text-xl sm:text-4xl font-bold leading-tight text-gray-900 dark:text-white font-display"
      >
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-sm sm:text-base text-gray-500">
        {{ subtitle }}
      </p>
    </div>
    <slot />
  </header>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
