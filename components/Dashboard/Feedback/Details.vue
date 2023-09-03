<template>
  <UCard
    class="flex flex-col flex-1"
    :ui="{
      body: { base: 'flex-1 overflow-y-auto', padding: 'p-2.5' },
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
        <UBadge color="primary" variant="subtle" :label="feedback.status" />
        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-ellipsis-vertical"
          class="-my-1"
          size="xs"
        />
        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          size="xs"
          @click="$emit('close')"
        />
      </div>
    </template>
    <ul class="space-y-2.5">
      <li>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-2.5 text-[14px]">
          <p class="text-gray-700 dark:text-gray-400">
            {{ feedback.message }}
          </p>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <UAvatar
            :src="feedback.user.avatar_url"
            :alt="feedback.user.name"
            class="ring-2 ring-gray-200 dark:ring-white/10"
          />
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ feedback.user.name }}
            </p>
            <p class="text-xs">{{ feedback.user.email }}</p>
          </div>
          <span class="flex-1"></span>
          <UBadge
            color="primary"
            variant="subtle"
            :label="feedback.user.label"
          />
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-950"
          >
            <UIcon name="i-heroicons-link-20-solid" class="h-6 w-6" />
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Origin
            </p>
            <p class="text-xs">{{ feedback.origin }}</p>
          </div>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-950"
          >
            <span class="text-2xl">🇳🇱</span>
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Country
            </p>
            <p class="text-xs">{{ feedback.country_name }}</p>
          </div>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-950"
          >
            <Icon name="logos:chrome" class="h-6 w-6" />
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Browser
            </p>
            <p class="text-xs">
              {{ feedback.device_details.browser }} -
              {{ feedback.device_details.browser_version }}
            </p>
          </div>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-950"
          >
            <Icon
              name="heroicons:device-phone-mobile-20-solid"
              class="h-6 w-6"
            />
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Device
            </p>
            <p class="text-xs">{{ feedback.device_details.name }}</p>
          </div>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-950"
          >
            <Icon name="heroicons:arrows-pointing-out" class="h-6 w-6" />
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Screen Resolution
            </p>
            <p class="text-xs">
              {{ feedback.device_details.screen_resolution }}
            </p>
          </div>
        </div>
      </li>
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">Internal Notes</p>
        <UButton
          square
          variant="soft"
          icon="i-heroicons-plus-circle"
          size="xs"
          color="gray"
        />
      </div>
      <li>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-2.5 text-[14px]">
          <p class="text-gray-700 dark:text-gray-400">
            {{ feedback.internal_notes }}
          </p>
        </div>
      </li>
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">Custom Attributes</p>
        <UButton
          square
          variant="soft"
          icon="i-heroicons-plus-circle"
          size="xs"
          color="gray"
        />
      </div>
      <li v-for="(attribute, i) in feedback.custom_attributes" :key="i">
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center justify-between text-sm"
        >
          <p>{{ attribute.key }}</p>
          <p>{{ attribute.value }}</p>
        </div>
      </li>
    </ul>
  </UCard>
</template>

<script lang="ts" setup>
defineEmits(["toggleFeedbackDetails"]);
defineProps({
  feedback: {
    type: Object,
    required: true,
  },
});
</script>
