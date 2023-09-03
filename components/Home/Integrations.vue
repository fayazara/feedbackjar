<template>
  <section class="pb-16 sm:pb-32 px-6 lg:px-0 max-w-4xl mx-auto">
    <div class="space-y-5 max-w-2xl">
      <h2 class="font-display text-2xl md:text-4xl font-bold">
        Powerful Integrations
      </h2>
      <p
        class="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
      >
        Feedbackjar integrates with your favourite tools to make your life
        easier.
      </p>
    </div>
    <div class="mt-5 flex items-center flex-wrap gap-5">
      <div
        v-for="integration in integrations"
        :key="integration.name"
        class="h-16 w-16 flex-shrink-0 bg-gray-50 dark:bg-gray-900 border dark:border-white/10 flex items-center justify-center rounded-xl"
      >
        <Icon :name="integration.icon" class="h-8 w-8" />
      </div>
    </div>
  </section>
</template>

<script setup>
const integrations = [
  {
    name: "Slack",
    icon: "logos:slack-icon",
  },
  {
    name: "Github",
    icon: "mdi:github",
  },
  {
    name: "Discord",
    icon: "logos:discord-icon",
  },
  {
    name: "Gmail",
    icon: "logos:google-gmail",
  },
  {
    name: "Linear",
    icon: "simple-icons:linear",
  },
  {
    name: "Trello",
    icon: "logos:trello",
  },
  {
    name: "Jira",
    icon: "logos:jira",
  },
];
</script>
