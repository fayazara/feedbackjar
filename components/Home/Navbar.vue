<template>
  <UContainer as="nav" class="h-16 flex items-center justify-between">
    <div class="flex items-center">
      <UIcon name="i-heroicons-envelope" class="text-3xl" />
      <p class="ml-2 text-lg font-semibold">EmailJar</p>
    </div>
    <UButton
      :to="loggedIn ? '/dashboard' : '/login'"
      color="primary"
      variant="soft"
      >{{ loggedIn ? "Dashboard &rarr;" : "Login" }}</UButton
    >
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
