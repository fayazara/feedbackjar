<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton size="xs" color="white" trailing-icon="i-heroicons-ellipsis-vertical" />
  </UDropdown>
</template>

<script setup>
const emit = defineEmits(["edit", "delete"]);
const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      click: () => {
        emit("edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      shortcuts: ["C"],
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Active",
      icon: "i-heroicons-check-circle-20-solid",
    },
    {
      label: "Draft",
      icon: "i-heroicons-pencil-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      shortcuts: ["D"],
      click: () => {
        emit("delete");
      },
    },
  ],
];
</script>
