<template>
  <button
    class="rounded-lg p-2 flex items-center gap-4 w-full relative ring-1 text-left"
    type="button"
    :class="checked ? 'bg-indigo-50 border-indigo-100' : ' ring-gray-200'"
  >
    <div
      class="rounded-lg h-12 w-12 flex items-center justify-center"
      :class="checked ? 'bg-indigo-100' : 'bg-gray-100'"
    >
      <Icon
        :name="icon"
        class="h-8 w-8 flex-shrink-0"
        :class="checked ? 'text-indigo-700' : 'text-gray-700'"
      />
    </div>
    <div>
      <p class="font-medium">{{ title }}</p>
      <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
    <icon
      name="solar:check-circle-bold-duotone"
      v-if="checked"
      class="text-indigo-600 ml-2 absolute right-2 h-6 w-6"
    />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  description: string;
  title: string;
  checked: boolean;
  icon: string;
}>();
</script>

<style></style>
