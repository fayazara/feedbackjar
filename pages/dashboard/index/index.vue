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
      @click="isOpen = true"
    />
  </DashboardHeader>
  <DashboardPageContainer>
    <DashboardCollectionList
      :collections="collections"
      @edit="editCollection"
    />
  </DashboardPageContainer>
  <UModal v-model="isOpen">
    <DashboardCollectionForm
      :mode="mode"
      @close="closeModal"
      :selectedCollection="selectedCollection"
      @updateCollection="updateCollection"
    />
  </UModal>
</template>

<script setup>
const { data: collections } = await useFetch("/api/collections");
const isOpen = ref(false);
const selectedCollection = ref(null);
const mode = ref("create");

function updateCollection(collection) {
  if (mode.value === "create") {
    collections.value.push(collection);
  }
  if (mode.value === "edit") {
    const index = collections.value.findIndex((c) => c.id === collection.id);
    collections.value[index] = collection;
  }
  isOpen.value = false;
  selectedCollection.value = null;
  mode = "create";
}

function closeModal() {
  isOpen.value = false;
  selectedCollection.value = null;
}

function editCollection(collection) {
  mode.value = "edit";
  selectedCollection.value = collection;
  isOpen.value = true;
}
</script>
