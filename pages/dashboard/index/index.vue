<template>
  <DashboardHeader
    title="Email Collections"
    subtitle="Create and manage email collections."
  >
    <UButton
      icon="i-heroicons-plus-small-20-solid"
      color="white"
      variant="solid"
      label="New Collection"
      @click="isModalOpen = true"
    />
  </DashboardHeader>
  <DashboardPageContainer>
    <DashboardCollectionList
      :collections="collections"
      @editCollection="editCollection"
      @deleteCollection="deleteCollection"
      @duplicateCollection="duplicateCollection"
    />
  </DashboardPageContainer>
  <UModal v-model="isModalOpen">
    <DashboardCollectionForm
      :mode="mode"
      @close="closeModal"
      :selectedCollection="selectedCollection"
      @updateCollection="updateCollection"
    />
  </UModal>
</template>

<script setup>
const {
  collections,
  isModalOpen,
  selectedCollection,
  mode,
  updateCollection,
  closeModal,
  editCollection,
  deleteCollection,
  duplicateCollection,
} = useCollection();
</script>
