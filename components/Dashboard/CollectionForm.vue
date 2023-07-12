<template>
  <form @submit.prevent="saveCollection">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-900' }">
      <template #header>
        <div class="flex items-center text-gray-600 dark:text-gray-300">
          <UIcon name="i-heroicons-document-plus" class="text-xl" />
          <p class="ml-3 text-sm font-semibold">{{ headerText }}</p>
        </div>
      </template>
      <div class="space-y-3">
        <UFormGroup name="name" label="Collection name" required :error="error">
          <UInput
            v-model="newCollection.name"
            :disabled="loading"
            color="white"
            variant="outline"
          />
        </UFormGroup>
        <UFormGroup name="description" label="What is this collection for?">
          <UTextarea
            v-model="newCollection.description"
            :disabled="loading"
            color="white"
            variant="outline"
          />
        </UFormGroup>
        <UFormGroup name="status" label="Status">
          <USelect
            v-model="newCollection.status"
            :options="statuses"
            option-attribute="name"
          />
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex items-center justify-end w-full space-x-2">
          <UButton type="button" @click="$emit('close')" variant="soft" color="black"
            >Cancel</UButton
          >
          <UButton
            :loading="loading"
            :disabled="isSaveDisabled"
            type="submit"
            color="black"
            >{{ saveButtonText }}</UButton
          >
        </div>
      </template>
    </UCard>
  </form>
</template>

<script setup>
const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  selectedCollection: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["updateCollection"]);

const {
  newCollection,
  error,
  loading,
  saveCollection,
  headerText,
  isSaveDisabled,
  saveButtonText,
  initEditMode,
  statuses,
} = useCollection(props, emit);

onMounted(() => {
  initEditMode();
});
</script>
