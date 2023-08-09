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
          @edit="edit(project)"
          @delete="deleteProject(project)"
          @duplicate="duplicate(project)"
          @archive="archive(project)"
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
        <UFormGroup
          name="name"
          label="Project name"
          help="The name of your project, this will be displayed on your public page."
        >
          <UInput v-model="project.name" size="md" />
        </UFormGroup>

        <UFormGroup
          name="description"
          label="Project description"
          help="A short description of your project."
        >
          <UTextarea v-model="project.description" />
        </UFormGroup>
        <UFormGroup name="status" label="Status">
          <USelectMenu
            v-model="project.status"
            :options="['active', 'archived']"
            option-attribute="name"
            size="md"
          />
        </UFormGroup>
        <UFormGroup
          name="website"
          label="Project URL"
          help="The website where your project is hosted"
        >
          <UInput v-model="project.website" type="url" size="md" />
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
          :type="mode === 'EDIT' ? 'PATCH' : 'POST'"
          variant="solid"
          color="gray"
          :label="mode === 'EDIT' ? 'Update' : 'Create project'"
          size="md"
        />
      </UForm>
    </UModal>

    <UModal v-model="deleteProjectConfirmationModal">
      <div class="px-4 pb-4 pt-5">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-100/10 sm:mx-0 sm:h-10 sm:w-10"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="h-6 w-6 text-red-500"
              aria-hidden="true"
            />
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <DialogTitle
              as="h3"
              class="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200"
              >Deactivate Project</DialogTitle
            >
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed from our servers forever. This
                action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="deleteProjectConfirmationModal = false"
          >
            Delete
          </button>
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="deleteProjectConfirmationModal = false"
            ref="cancelButtonRef"
          >
            Cancel
          </button>
        </div>
      </div>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from "zod";
import { Ref, ref, computed } from "vue";

const { data: projects } = await useFetch(`/api/projects`);
const newProjectModal = ref(false);
const deleteProjectConfirmationModal = ref(false);
const loading = ref(false);
const form = ref();

const schema = z.object({
  name: z.string().nonempty("Required"),
  description: z.string().min(8, "Must be at least 8 characters").optional(),
  website: z.string().url("Invalid URL").optional(),
});

interface Project {
  id?: number | null;
  name: string;
  description: string;
  website: string;
  status: "active" | "archived";
  userId?: number;
}

const project: Ref<Project> = ref({
  name: "",
  description: "",
  website: "",
  status: "active",
});

const mode: Ref<"CREATE" | "EDIT"> = ref("CREATE");

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
    let URL =
      mode.value === "EDIT"
        ? `/api/projects/${project.value.id}`
        : "/api/projects";
    loading.value = true;
    const response = await $fetch(URL, {
      method: mode.value === "EDIT" ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: transformData(),
    });
    if (mode.value === "EDIT") {
      const index = projects.value!.findIndex((p) => p.id === project.value.id);
      projects.value![index] = response;
    } else if (mode.value === "CREATE") {
      projects.value!.push(response);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function edit(projectData: Project) {
  mode.value = "EDIT";
  project.value = projectData;
  newProjectModal.value = true;
}

function duplicate(projectData: Project) {
  mode.value = "CREATE";
  project.value = projectData;
  newProjectModal.value = true;
}

function archive(projectData: Project) {
  console.log(projectData);
}

function deleteProject(projectData: Project) {
  deleteProjectConfirmationModal.value = true;
}
</script>
