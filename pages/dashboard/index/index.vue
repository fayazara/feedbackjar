<template>
  <DashboardHeader title="Projects" subtitle="Create and manage projects.">
    <UButton
      icon="i-heroicons-plus-small-20-solid"
      color="white"
      variant="solid"
      label="New Collection"
      @click="isModalOpen = true"
    />
  </DashboardHeader>
  <DashboardPageContainer> sajsfdb </DashboardPageContainer>
</template>

<script setup>
const { data: projects } = useFetch("/api/projects");
</script>
