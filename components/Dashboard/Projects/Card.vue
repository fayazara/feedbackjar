<template>
  <div class="border bg-white p-4 rounded-lg">
    <div class="flex items-center gap-x-0.5">
      <UAvatar :src="project.avatar" :alt="project.name" />
      <span class="flex-grow"></span>
      <span
        class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
      >
        <svg
          class="h-1.5 w-1.5 fill-green-500"
          viewBox="0 0 6 6"
          aria-hidden="true"
        >
          <circle cx="3" cy="3" r="3" />
        </svg>
        {{ project.status }}
      </span>
      <UDropdown :items="menuItems">
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          square
          variant="ghost"
          color="gray"
        />
      </UDropdown>
    </div>
    <div class="mt-8">
      <p class="font-semibold">{{ project.name }}</p>
      <p class="text-sm text-gray-600">{{ project.description }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
        console.log("Edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];
</script>
