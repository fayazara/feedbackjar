<template>
  <UContainer
    class="py-12 px-4 sm:px-6 lg:px-8"
    :ui="{ constrained: 'max-w-4xl' }"
  >
    <DashboardHeader
      title="Projects"
      subtitle="Manage your projects here."
      class="max-w-none"
    >
      <UButton
        @click="newProjectModal = true"
        label="Create new project"
        color="black"
        variant="solid"
      />
    </DashboardHeader>
    <section class="py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DashboardProjectsCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>
    <UModal v-model="newProjectModal">
      <UForm
        ref="form"
        :schema="schema"
        :state="project"
        @submit.prevent="submit"
        class="space-y-6 p-4"
      >
        <UFormGroup name="name" label="Project name">
          <UInput v-model="project.name" />
        </UFormGroup>

        <UFormGroup name="description" label="Project description">
          <UTextarea v-model="project.description" />
        </UFormGroup>
        <UFormGroup name="status" label="Status">
          <USelectMenu
            v-model="project.status"
            :options="['active', 'archived']"
            option-attribute="name"
          />
        </UFormGroup>
        <UFormGroup name="website" label="Project URL">
          <UInput
            v-model="project.website"
            type="url"
            placeholder="https://example.com"
          />
        </UFormGroup>
        <div>
          <p class="block font-medium text-gray-700 dark:text-gray-200">
            Project Logo
          </p>
          <div class="flex items-center space-x-3 mt-3">
            <div
              class="rounded-lg h-16 w-16 flex border dark:border-gray-800 items-center justify-center"
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
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from "zod";

const { data: projects } = await useFetch(`/api/projects`);
const newProjectModal = ref(false);
const loading = ref(false);
const form = ref();

const schema = z.object({
  name: z.string().nonempty("Required"),
  description: z.string().min(8, "Must be at least 8 characters").optional(),
  website: z.string().url("Invalid URL").optional(),
});

const project = ref({
  name: undefined,
  description: undefined,
  website: undefined,
  status: "active",
});

function transformData() {
  return {
    ...project.value,
    avatar: avatar.value,
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
    const response = await $fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: transformData(),
    });
    projects.value.push(response);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
