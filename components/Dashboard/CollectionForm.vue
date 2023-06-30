<template>
  <form @submit.prevent="saveCollection">
    <UCard :ui="{ divide: 'divide-y divide-slate-100 dark:divide-slate-800' }">
      <template #header>
        <div class="flex items-center text-slate-600 dark:text-slate-300">
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
          <UButton type="button" @click="$emit('close')" variant="soft"
            >Cancel</UButton
          >
          <UButton
            :loading="loading"
            :disabled="isSaveDisabled"
            type="submit"
            >{{ saveButtonText }}</UButton
          >
        </div>
      </template>
    </UCard>
  </form>
</template>

<script setup>
const newCollection = ref({ name: "", description: "", status: "active" });
const error = ref("");
const loading = ref(false);
const toast = useToast();

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

const statuses = [
  { name: "Active", value: "active" },
  { name: "Archived", value: "archived" },
  { name: "Draft", value: "draft" },
];

function saveCollection() {
  error.value = "";

  if (!newCollection.value.name.trim()) {
    error.value = "Collection name is required";
    return;
  }
  loading.value = true;
  const url =
    props.mode === "edit"
      ? `/api/collections/${props.selectedCollection.id}`
      : "/api/collections";

  const method = props.mode === "edit" ? "PATCH" : "POST";
  const title =
    props.mode === "edit"
      ? `Collection "${props.selectedCollection.name}" updated.`
      : `Collection "${newCollection.value.name}" created.`;

  const body = JSON.stringify(newCollection.value);

  $fetch(url, { method, body })
    .then((collection) => {
      toast.add({ icon: "i-heroicons-check-circle", title });
      newCollection.value.name = "";
      newCollection.value.description = "";
      emit("updateCollection", collection);
    })
    .catch((err) => {
      console.log(err);
      if (err.data?.data?.issues) {
        const title = err.data.data.issues
          .map((issue) => issue.message)
          .join("\n");
        toast.add({ title, color: "red" });
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

const headerText = computed(() => {
  return props.mode === "edit" && props.selectedCollection.name
    ? props.selectedCollection.name
    : "Add a new Email Collection";
});

const isSaveDisabled = computed(() => {
  return newCollection.value.name.trim().length === 0 || loading.value;
});

const saveButtonText = computed(() => {
  return props.mode === "edit" ? "Update" : "Save";
});

onMounted(() => {
  if (props.mode === "edit") {
    newCollection.value.name = props.selectedCollection.name;
    newCollection.value.description = props.selectedCollection.description;
    newCollection.value.status = props.selectedCollection.status;
  }
});
</script>
