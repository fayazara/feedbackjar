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
        <UBadge color="primary" variant="subtle" label="Open" />
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
          @click="$emit('toggleFeedbackDetails')"
        />
      </div>
    </template>
    <ul class="space-y-2.5">
      <li>
        <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-2.5 text-[14px]">
          <p class="text-gray-700 dark:text-gray-400">
            Notification delay, my users expect to get a notification as soon as
            our app is down, and it affects their business, this new update is
            actually delaying the notifications, it used to work as expected
            earlier, not for some reason it's just delayed sometimes by even
            hours.
          </p>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <UAvatar
            src="https://api.dicebear.com/6.x/initials/svg?seed=Emily%20Chen"
            class="ring-2 ring-gray-200 dark:ring-white/10"
          />
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Emily Chen
            </p>
            <p class="text-xs">emily@instatus.com</p>
          </div>
          <span class="flex-1"></span>
          <UBadge color="primary" variant="subtle" label="Prime Customer" />
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center gap-x-3"
        >
          <div
            class="h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-950"
          >
            <UIcon
              name="i-heroicons-arrow-down-on-square-20-solid"
              class="h-6 w-6"
            />
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Origin
            </p>
            <p class="text-xs">app.instatus.com/settings</p>
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
            <!-- <UIcon name="i-heroicons-globe-alt"  class="h-6 w-6"/> -->
            <span class="text-2xl">🇮🇳</span>
          </div>
          <div class="text-gray-700 dark:text-gray-400">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              Country
            </p>
            <p class="text-xs">India</p>
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
            <p class="text-xs">Chrome v108.9</p>
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
            <p class="text-xs">Macbook Pro</p>
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
            <p class="text-xs">1920x1080</p>
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
            This is a known bug and Ali is already working on it. Emily was
            informed about the same.
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
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center justify-between text-sm"
        >
          <p>Subscription Plan</p>
          <p>Startup ($240/mo)</p>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center justify-between text-sm"
        >
          <p>Twitter Handle</p>
          <p>@instatus</p>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center justify-between text-sm"
        >
          <p>Company</p>
          <p>Instatus</p>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center justify-between text-sm"
        >
          <p>Company Size</p>
          <p>1-10</p>
        </div>
      </li>
      <li>
        <div
          class="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 flex items-center justify-between text-sm"
        >
          <p>Industry</p>
          <p>Software</p>
        </div>
      </li>
    </ul>
  </UCard>
</template>

<script lang="ts" setup>
defineEmits(["toggleFeedbackDetails"]);
</script>
