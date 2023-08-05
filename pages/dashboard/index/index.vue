<template>
  <UContainer class="py-12" :ui="{ constrained: 'max-w-4xl' }">
    <DashboardHeader
      title="Projects"
      subtitle="Manage your projects here."
      class="max-w-none"
    >
      <UButton label="Create new project" color="black" variant="solid" />
    </DashboardHeader>
    <section class="py-8">
      <div class="grid grid-cols-2">
        {{ projects }}
      </div>
    </section>
  </UContainer>
</template>

<script setup>
const { data: projects } = await useAsyncData("projects", () =>
  $fetch(`/api/projects`)
);
</script>

<style></style>
