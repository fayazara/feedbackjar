<template>
  <nav
    class="flex justify-between items-center px-6 mx-auto max-w-4xl h-16 lg:px-0"
  >
    <div class="flex gap-x-2 items-center">
      <Logo class="w-auto h-8" />
      <span class="text-lg font-bold font-display">Feedbackjar</span>
    </div>
    <div>
      <div class="hidden gap-x-4 items-center md:flex">
        <UButton
          variant="ghost"
          color="gray"
          class="transition-transform active:scale-[0.98]"
          to="/"
          >Pricing</UButton
        >
        <UButton
          variant="ghost"
          color="gray"
          class="transition-transform active:scale-[0.98] flex items-center gap-x-1"
          external
          target="_blank"
          to="https://github.com/fayazara/feedbackjar"
        >
          <span> Github </span>
          <Icon name="heroicons:star-20-solid" />
          <span>
            {{ stars }}
          </span>
        </UButton>
        <UButton
          variant="ghost"
          color="gray"
          class="transition-transform active:scale-[0.98]"
          to="/"
          >Docs</UButton
        >
        <UButton
          variant="ghost"
          color="gray"
          class="transition-transform active:scale-[0.98]"
          :to="loggedIn ? '/dashboard' : '/login'"
          external
          >{{ loggedIn ? "Dashboard &rarr;" : "Login &rarr;" }}</UButton
        >
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  loggedIn: {
    type: Boolean,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});
</script>
