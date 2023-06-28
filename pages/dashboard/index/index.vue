<template>
  <DashboardHeader
    title="Email Lists"
    subtitle="Create and manage email lists."
  >
    <UButton
      icon="i-heroicons-plus-small-20-solid"
      color="white"
      variant="solid"
      label="New List"
      @click="isOpen = true"
    />
  </DashboardHeader>
  <DashboardPageContainer> </DashboardPageContainer>
  <UModal v-model="isOpen">
    <form @submit.prevent="saveList">
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header> Add a new Email List </template>

        <UFormGroup name="name" label="List name" required :error="error">
          <UInput v-model="listName" />
        </UFormGroup>

        <template #footer>
          <div class="flex items-center justify-end w-full space-x-2">
            <UButton type="button" @click="isOpen = false" variant="soft"
              >Cancel</UButton
            >
            <UButton type="submit">Save</UButton>
          </div>
        </template>
      </UCard>
    </form>
  </UModal>
</template>

<script setup>
const isOpen = ref(false);
const listName = ref("");
const error = ref("");
async function saveList() {
  try {
    if (!listName.value) {
      error.value = "List name is required";
      return;
    }
    console.log("Saving list", listName.value);
    error.value;
  } catch (error) {
    console.error(error);
  }
}
</script>
