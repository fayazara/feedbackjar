<template>
  <nav
    class="h-16 max-w-4xl mx-auto flex items-center justify-between px-6 lg:px-0"
  >
    <div class="flex items-center gap-x-2">
      <Logo class="h-8 w-auto" />
      <span class="text-lg font-bold font-display">Feedbackjar</span>
    </div>
    <div>
      <div class="items-center gap-x-4 hidden md:flex">
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
          :to="loggedIn ? '/dashboard' : '/api/auth/github'"
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
