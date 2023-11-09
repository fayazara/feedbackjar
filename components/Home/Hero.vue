<template>
  <section class="px-6 py-16 mx-auto max-w-4xl md:py-32 lg:px-0">
    <div class="space-y-5 max-w-2xl">
      <HomeWhatsNewPill text="v.0.1.23 We're now open source" />
      <h1 class="text-2xl font-bold font-display md:text-4xl">
        Streamlined feedback, public roadmaps, and changelogs.
      </h1>
      <p
        class="text-base font-medium text-gray-600 md:text-lg dark:text-gray-400"
      >
        Feedbackjar empowers product teams to effortlessly gather feedback,
        track issues, and seamlessly manage them with public roadmaps and
        provide updates via changelogs.
      </p>
      <div class="!mt-10">
        <UButton
          :to="loggedIn ? '/dashboard' : '/login'"
          :ui="{ rounded: 'rounded-lg' }"
          size="xl"
          color="black"
          variant="solid"
          class="transition-transform active:scale-[0.98]"
          external
        >
          {{ loggedIn ? "Go to dashboard &rarr;" : "Get Started &rarr;" }}
        </UButton>
      </div>
    </div>
  </section>
  <section
    class="overflow-hidden mx-auto max-w-4xl rounded-none ring-8 ring-gray-200 md:rounded-xl dark:ring-white/10"
  >
    <img src="/feedbackjar-dashboard.png" alt="Feedbackjar dashboard" />
  </section>
</template>

<script setup>
defineProps({
  loggedIn: {
    type: Boolean,
    required: true,
  },
});
</script>
