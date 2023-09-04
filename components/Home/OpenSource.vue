<template>
  <section class="pb-16 sm:pb-32 px-6 lg:px-0 max-w-4xl mx-auto">
    <div class="space-y-5 max-w-2xl">
      <h2 class="font-display text-2xl md:text-4xl font-bold">
        We're open source
      </h2>
      <p
        class="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
      >
        We strongly believe open source is the future of software development.
        It could even be a compliance requirement in the future. Check us out on
        GitHub and star us if you like what we're doing.
      </p>
      <div class="flex items-center gap-x-3">
        <UButton
          label="Github"
          icon="i-mdi-github"
          color="black"
          size="xl"
          :ui="{ rounded: 'rounded-lg' }"
          target="_blank"
          to="https://github.com/fayazara/feedbackjar"
        />
        <Icon name="heroicons:star-20-solid" />
        <span> {{ stars }} stars </span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  stars: {
    type: Number,
    required: true,
  },
});
</script>
