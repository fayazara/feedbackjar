<template>
  <UContainer as="nav" class="h-16 flex items-center justify-between">
    <div class="flex items-center justify-between">
      <img height="32" width="32" src="/logo.png" alt="Feedbackjar Logo" />
      <p class="ml-2 text-lg font-semibold">Feedbackjar</p>
    </div>
    <div class="flex-grow"></div>
    <ThemeToggle />
    <UButton
      :to="loggedIn ? '/dashboard' : '/login'"
      color="primary"
      variant="soft"
      class="ml-3"
    >
      {{ loggedIn ? "Dashboard &rarr;" : "Login" }}
    </UButton>
  </UContainer>
</template>

<script setup>
const props = defineProps({
  loggedIn: {
    type: Boolean,
    required: true,
  },
});
</script>
