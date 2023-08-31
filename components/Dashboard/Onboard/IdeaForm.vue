<template>
  <div class="max-w-lg w-full">
    <div class="mb-12">
      <h2 class="text-2xl font-bold tracking-tight">
        Add an idea {{ projectId }}
      </h2>
      <p class="text-sm">
        An idea, bug or suggestion. This is optional, you can always add it
        later.
      </p>
    </div>
    <UForm
      ref="form"
      :schema="schema"
      :state="formData"
      @submit.prevent="submit"
      class="space-y-6"
    >
      <UFormGroup name="name" label="What's is this?">
        <UTextarea v-model="formData.message" size="lg" />
      </UFormGroup>

      <UFormGroup name="status" label="Status">
        <USelectMenu
          size="lg"
          v-model="formData.status"
          :options="status"
          value-attribute="value"
        />
      </UFormGroup>

      <UFormGroup name="category" label="Category">
        <div class="space-y-3">
          <DashboardOnboardCategoryOption
            v-for="category in categories"
            :key="category.key"
            :title="category.label"
            :description="category.description"
            :icon="category.icon"
            :checked="formData.category === category.label"
            @click="formData.category = category.label"
          />
        </div>
      </UFormGroup>

      <UButton
        :loading="loading"
        type="submit"
        variant="solid"
        color="black"
        label="Save"
        size="md"
      />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
const projectId = useState("projectId");

const loading = ref(false);
const form = ref();
const emit = defineEmits(["nextab"]);

const schema = z.object({
  message: z.string().min(8, "Must be at least 8 characters"),
  category: z.string(),
  status: z.string(),
});

const status = [
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
  { label: "Completed", value: "Completed" },
];

const categories = [
  {
    label: "Bug",
    key: "issue",
    icon: "solar:bug-bold-duotone",
    description: "A bug or an issue that's breaking your app",
  },
  {
    label: "Idea",
    key: "idea",
    icon: "solar:lightbulb-bolt-bold-duotone",
    description: "An idea for a new feature or improvement",
  },
  {
    label: "Other",
    key: "other",
    icon: "solar:archive-minimalistic-bold-duotone",
    description: "Something else that you need added",
  },
];

const formData = ref({
  message: undefined,
  category: "Bug",
  status: "Active",
});

async function submit() {
  await form.value!.validate();
  try {
    loading.value = true;
    await $fetch(`/api/projects/${projectId.value}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData.value,
    });
    emit("nextab");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
