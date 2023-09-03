<template>
  <section class="py-16 md:py-32 px-6 lg:px-0 max-w-4xl mx-auto">
    <div class="space-y-5 max-w-2xl">
      <h2 class="font-display text-2xl md:text-4xl font-bold">
        What is Feedbackjar?
      </h2>
      <p
        class="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
      >
        Everything you need to collect, manage and close feedback, ideas and
        bugs. You focus on building your product, we handle collecting feedback,
        posting them on public boards, prioritizing them with public roadmaps
        and accouncing updates to with changelogs.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-5 mt-5">
      <div class="card group">
        <Icon
          name="solar:archive-down-minimlistic-bold-duotone"
          class="icon group-hover:text-indigo-600 transition-all group-hover:rotate-6"
        />
        <div class="mt-auto">
          <h3>Incoming Feedback</h3>
          <p class="description mt-1">
            Collect feedback with widget/sdk/api/urls/qr-codes.
          </p>
          <NuxtLink class="text-xs description" to="/"
            >Learn more &rarr;</NuxtLink
          >
        </div>
      </div>
      <div class="card group">
        <Icon
          name="solar:map-arrow-square-bold-duotone"
          class="icon group-hover:text-indigo-600 transition-all group-hover:rotate-6"
        />
        <div class="mt-auto">
          <h3>Roadmaps</h3>
          <p class="description mt-1">
            Show what you're working on and what's coming next.
          </p>
          <NuxtLink class="text-xs description" to="/"
            >Learn more &rarr;</NuxtLink
          >
        </div>
      </div>
      <div class="card group">
        <Icon
          name="solar:volume-loud-bold-duotone"
          class="icon group-hover:text-indigo-600 transition-all group-hover:rotate-6"
        />
        <div class="mt-auto">
          <h3>Changelogs</h3>
          <p class="description mt-1">
            Announce updates to your users with changelogs.
          </p>
          <NuxtLink class="text-xs description" to="/"
            >Learn more &rarr;</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
.card {
  @apply h-64 bg-gray-50 dark:bg-gray-900 border dark:border-gray-800 rounded-2xl flex flex-col p-4 relative cursor-pointer;
}

h3 {
  @apply font-bold font-display text-lg;
}

.description {
  @apply text-gray-600 dark:text-gray-400 leading-6;
}

.icon {
  @apply h-12 w-12 dark:text-gray-200;
}
</style>
