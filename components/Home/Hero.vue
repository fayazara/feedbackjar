<template>
  <section class="py-16 md:py-32 px-6 lg:px-0 max-w-4xl mx-auto">
    <div class="space-y-5 max-w-2xl">
      <HomeWhatsNewPill text="v.0.1.23 We're now open source" />
      <h1 class="font-display text-2xl md:text-4xl font-bold">
        Streamlined feedback, public roadmaps, and changelogs.
      </h1>
      <p
        class="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
      >
        Feedbackjar empowers product teams to effortlessly gather feedback,
        track issues, and seamlessly manage them with public roadmaps and
        provide updates via changelogs.
      </p>
      <div class="!mt-10">
        <UButton
          :to="loggedIn ? '/dashboard' : '/api/auth/github'"
          size="xl"
          color="black"
          :ui="{ rounded: 'rounded-lg' }"
          variant="solid"
          class="transition-transform active:scale-[0.98]"
          external
        >
          {{ loggedIn ? "Go to dashboard &rarr;" : "Sign up with Github &rarr;" }}
        </UButton>
      </div>
    </div>
  </section>
  <section
    class="rounded-none md:rounded-xl max-w-4xl mx-auto overflow-hidden ring-8 ring-gray-200 dark:ring-white/10"
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
