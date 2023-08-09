<template>
  <UCard
    class="flex flex-col flex-1"
    :ui="{
      body: { base: 'flex-1' },
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-white/10',
      header: { padding: 'px-4 py-3' },
      background: 'bg-white dark:bg-gray-950',
    }"
  >
    <template #header>
      <div class="flex items-center gap-x-1">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          Feedback Details
        </h3>
        <span class="flex-1"></span>
        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-ellipsis-vertical"
          class="-my-1"
          size="xs"
          @click="isOpen = false"
        />
        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          size="xs"
          @click="isOpen = false"
        />
      </div>
    </template>

    <Placeholder class="h-full" />
  </UCard>
</template>

<script lang="ts" setup></script>
