<template>
  <DashboardHeader
    :title="emailCollection?.collection.name"
    :subtitle="emailCollection?.collection.description"
  />
  <DashboardPageContainer>
    <div class="bg-white rounded-xl border">
      <UTable :rows="emailCollection?.emails" />
    </div>
  </DashboardPageContainer>
</template>

<script setup>
const { emailCollection } = useEmail();
</script>
