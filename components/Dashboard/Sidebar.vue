<template>
  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 px-6"
  >
    <div class="flex h-16 shrink-0 items-center justify-between">
      <div class="flex items-center space-x-2">
        <Logo class="h-8 w-auto" role="img" />
        <span class="font-bold text-xl">Feedbackjar</span>
      </div>
      <UButton
        v-if="closeButton"
        icon="i-heroicons-x-mark"
        @click="$emit('close')"
        square
        color="white"
        variant="ghost"
      />
    </div>
    <nav class="flex flex-1 flex-col">
      <UDropdown
        :items="projects"
        :popper="{ placement: 'bottom-start' }"
        class="mb-4"
      >
        <UButton color="gray" size="lg" class="text-left w-full">
          <template #leading>
            <UAvatar
              src="https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png"
              size="xs"
            />
          </template>
          <div class="flex-grow">Dribble</div>
          <template #trailing>
            <UIcon name="i-heroicons-chevron-down-20-solid" />
          </template>
        </UButton>
      </UDropdown>
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <NuxtLink
                @click="$emit('close')"
                :to="item.href"
                class="navlink group"
              >
                <Icon
                  :name="item.icon"
                  class="navlink-icon"
                  aria-hidden="true"
                />
                <span>
                  {{ item.name }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li>
          <div class="text-xs font-semibold leading-6 text-gray-400">
            FILTER
          </div>
          <ul role="list" class="-mx-2 mt-2 space-y-1">
            <li v-for="team in teams" :key="team.name">
              <a
                :href="team.href"
                :class="[
                  team.current
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                ]"
              >
                <span
                  :class="[
                    team.current
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white',
                  ]"
                  >{{ team.initial }}</span
                >
                <span class="truncate">{{ team.name }}</span>
              </a>
            </li>
          </ul>
        </li>
        <li class="-mx-6 mt-auto relative">
          <UDropdown
            :items="userSettings"
            class="w-full"
            :ui="{ width: 'w-[17rem]' }"
            :popper="{ placement: 'bottom-start' }"
          >
            <button
              class="flex items-center w-full justify-between py-3 text-sm font-semibold leading-6 bg-gray-50 dark:bg-gray-950 dark:border-t border-gray-900 px-6"
            >
              <div class="flex items-center gap-x-4">
                <UAvatar :src="user.avatar_url" :alt="user.name" />
                <span aria-hidden="true">{{ user.name }}</span>
              </div>
              <Icon name="heroicons:ellipsis-vertical" class="h-6 w-6" />
            </button>
          </UDropdown>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { GitHubUser } from "server/types/github";

interface Props {
  closeButton: boolean;
  user: GitHubUser;
  clear: () => void;
}
const props = defineProps<Props>();

const teams = [
  { id: 1, name: "All", href: "#", initial: "H", current: false },
  { id: 2, name: "Issues", href: "#", initial: "T", current: false },
  { id: 3, name: "Idea", href: "#", initial: "W", current: false },
  { id: 3, name: "Other", href: "#", initial: "W", current: false },
  { id: 3, name: "Archived", href: "#", initial: "W", current: false },
];

const navigation = [
  {
    name: "Overview",
    href: "/dashboard/overview",
    icon: "heroicons:chart-pie",
  },
  {
    name: "Tickets",
    href: "/dashboard/collections",
    icon: "heroicons:folder",
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: "heroicons:currency-rupee",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "heroicons:cog-6-tooth",
  },
];

const userSettings = [
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        props.clear();
      },
    },
  ],
];

const projects = [
  [
    {
      label: "Dribbble",
      avatar: {
        src: "https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png",
      },
    },
    {
      label: "Figma",
      avatar: {
        src: "https://static.figma.com/app/icon/1/icon-128.png",
      },
    },
    {
      label: "Gleap",
      avatar: {
        src: "https://uploads-ssl.webflow.com/634eb51a43522eda9b21e8c3/63c5a7a9ad3731514682c748_android-chrome-512x512.png",
      },
    },
  ],
];
</script>

<style scoped>
.navlink {
  @apply flex gap-x-3 items-center rounded-md p-2 text-sm leading-6 font-medium text-gray-700 dark:text-gray-400 hover:text-indigo-600 hover:bg-gray-100 hover:dark:bg-gray-800;
}
.navlink.router-link-exact-active {
  @apply bg-gray-100 dark:bg-gray-900 text-indigo-600 dark:text-indigo-200;
}

.navlink-icon {
  @apply h-5 w-5 shrink-0 text-gray-400 group-hover:text-indigo-600;
}

.navlink.router-link-exact-active .navlink-icon {
  @apply text-indigo-600;
}
</style>
