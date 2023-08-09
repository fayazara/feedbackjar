<template>
  <div
    class="border bg-white dark:bg-gray-950 dark:border-white/10 p-4 rounded-lg relative"
  >
    <div class="flex items-center gap-x-0.5">
      <UAvatar
        :src="project.avatar"
        :alt="project.name"
        class="ring-2 ring-gray-200 dark:ring-white/10"
      />
      <span class="flex-grow"></span>
      <span
        class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 dark:text-white/60 ring-1 ring-inset ring-gray-200 dark:ring-white/10"
      >
        <svg
          class="h-1.5 w-1.5"
          :class="{
            'fill-green-500': project.status === 'active',
            'fill-gray-500': project.status === 'archived',
          }"
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx="3" cy="3" r="3" />
        </svg>
        {{ getProjectStatus(project.status) }}
      </span>
      <UDropdown :items="menuItems" class="relative z-30">
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          square
          variant="ghost"
          color="gray"
        />
      </UDropdown>
    </div>
    <div class="mt-8 space-y-2">
      <NuxtLink :to="`/dashboard/${project.id}`" class="font-semibold">
        {{ project.name }}
        <span class="absolute inset-0 z-20"></span>
      </NuxtLink>
      <p class="text-sm text-gray-600">{{ project.description }}</p>
      <div
        v-if="project.website"
        class="flex items-center justify-between text-sm text-gray-600"
      >
        <span class="font-medium">URL</span>
        <span>{{ project.website }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["edit", "duplicate", "archive", "delete"]);
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const menuItems = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        emit("edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      click: () => {
        emit("duplicate");
      },
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
      click: () => {
        emit("archive");
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        emit("delete");
      },
    },
  ],
];

const getProjectStatus = (status: string) => {
  if (status === "archived") {
    return "Archived";
  } else if (status === "inactive") {
    return "Inactive";
  } else {
    return "Active";
  }
};
</script>
