<template>
  <div class="max-w-lg w-full">
    <div class="mb-12">
      <h2 class="text-2xl font-bold tracking-tight">Create a Project</h2>
      <p class="text-sm">Enter a few details about your first project.</p>
    </div>
    <UForm
      ref="form"
      :schema="schema"
      :state="project"
      @submit.prevent="submit"
      class="space-y-6"
    >
      <UFormGroup name="name" label="Project name">
        <UInput v-model="project.name" size="lg" />
      </UFormGroup>

      <UFormGroup name="description" label="Project description">
        <UTextarea v-model="project.description" size="lg" />
      </UFormGroup>
      <UFormGroup name="website" label="Project URL">
        <UInput
          v-model="project.website"
          type="url"
          placeholder="https://example.com"
          size="lg"
        />
      </UFormGroup>
      <div>
        <p class="block font-medium text-gray-700 dark:text-gray-200">
          Project Logo
        </p>
        <div class="flex items-center space-x-3 mt-3">
          <div
            class="rounded-lg h-16 w-16 flex border dark:border-white/10 items-center justify-center"
          >
            <UAvatar
              :src="avatar"
              size="lg"
              class="ring-2 ring-gray-100 dark:ring-gray-800"
            />
          </div>
        </div>
      </div>
      <UButton
        :loading="loading"
        type="submit"
        variant="solid"
        color="black"
        label="Create project"
        size="md"
      />
    </UForm>
  </div>
</template>

<script setup lang="ts">
const projectId = useState("projectId");

import { z } from "zod";
const loading = ref(false);
const form = ref();
const emit = defineEmits(["nextab"]);

const schema = z.object({
  name: z.string().nonempty("Required"),
  description: z.string().min(8, "Must be at least 8 characters").optional(),
  website: z.string().url("Invalid URL").optional(),
});

const project = ref({
  name: undefined,
  description: undefined,
  website: undefined,
});

function transformData() {
  return {
    ...project.value,
    avatar: `https://logo.clearbit.com/${project.value.website}`,
    status: "active",
  };
}

const urlSchema = z.string().url();

const isUrlValid = (url: string) => {
  try {
    urlSchema.parse(url);
    return true;
  } catch (err) {
    return false;
  }
};

const avatar = computed(() => {
  if (project.value.website && isUrlValid(project.value.website)) {
    return `https://logo.clearbit.com/${project.value.website}`;
  }
  return `https://api.dicebear.com/6.x/shapes/svg?seed=${
    project.value.name || ""
  }`;
});

async function submit() {
  await form.value!.validate();
  try {
    loading.value = true;
    const response = await $fetch("/api/projects/onboard", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: transformData(),
    });
    projectId.value = response.id;
    emit("nextab");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
