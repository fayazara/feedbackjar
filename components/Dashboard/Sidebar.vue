<template>
  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 px-4"
  >
    <div class="flex h-14 shrink-0 items-center justify-between">
      <div class="flex items-center space-x-2">
        <Logo class="h-6 w-auto" role="img" />
        <span class="font-semibold text-lg">Feedbackjar</span>
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
        v-if="!isAccountRoute"
        :items="projects"
        :popper="{ placement: 'bottom-start' }"
        class="mb-4 w-full"
        :ui="{ width: 'w-[223px]' }"
      >
        <UButton color="gray" size="lg" square class="text-left p-1.5" block>
          <template #leading>
            <UAvatar
              src="https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png"
              size="2xs"
            />
          </template>
          <div class="flex-grow text-sm">Dribble</div>
          <template #trailing>
            <Icon name="heroicons:chevron-down-solid" />
          </template>
        </UButton>
      </UDropdown>
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="space-y-1">
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
        <li v-if="!isAccountRoute">
          <div class="text-xs font-semibold leading-6 text-gray-400">
            FILTER
          </div>
          <ul role="list" class="-mx-2 mt-2 space-y-1">
            <li v-for="filter in filters" :key="filter.key">
              <button
                @click="selectedFilter = filter.key"
                class="group flex items-center text-left gap-x-3 rounded-md py-1.5 px-2 text-sm font-semibold text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800 w-full"
                :class="{
                  'bg-gray-100 dark:bg-gray-800': selectedFilter === filter.key,
                }"
              >
                <svg
                  class="h-2 w-2"
                  :class="filter.fill"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="3" />
                </svg>
                <span class="flex-1">{{ filter.name }}</span>
                <span v-if="selectedFilter === filter.key" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </li>
          </ul>
        </li>
        <li class="-mx-4 mt-auto relative">
          <UDropdown
            :items="userSettings"
            class="w-full"
            :ui="{ width: 'w-[15rem]' }"
            :popper="{ placement: 'bottom-start' }"
          >
            <button
              class="flex items-center w-full justify-between py-2.5 text-sm font-semibold leading-6 bg-gray-50 dark:bg-gray-950 dark:border-t border-gray-900 px-4"
            >
              <div class="flex items-center gap-x-4">
                <UAvatar :src="user.avatarUrl" :alt="user.name" />
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
import { GithubUser } from "@/lib/types/github";

interface Props {
  closeButton: boolean;
  user: GithubUser;
  clear: () => void;
  isAccountRoute: boolean;
}
const props = defineProps<Props>();

const selectedFilter = ref("all");

const navigation = computed(() => {
  if (props.isAccountRoute) {
    return accountNavigationLinks;
  }
  return projectNavigationLinks;
});

const projectNavigationLinks = [
  {
    name: "Overview",
    href: "/overview",
    icon: "heroicons:chart-pie",
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: "heroicons:archive-box-arrow-down",
  },
  {
    name: "Settings",
    href: "/project-settings",
    icon: "heroicons:cog-6-tooth",
  },
];

const accountNavigationLinks = [
  {
    name: "New Project",
    href: "/new-project",
    icon: "heroicons:folder",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "heroicons:cog-6-tooth",
  },
  {
    name: "Billing",
    href: "/feedback",
    icon: "heroicons:currency-rupee",
  },
];

const filters = [
  { id: 1, name: "All", key: "all", fill: "fill-indigo-500", selected: false },
  {
    id: 2,
    name: "Issues",
    key: "issues",
    fill: "fill-rose-500",
    selected: false,
  },
  { id: 3, name: "Ideas", key: "Ideas", fill: "fill-sky-500", selected: false },
  {
    id: 3,
    name: "Other",
    key: "other",
    fill: "fill-yellow-500",
    selected: false,
  },
  {
    id: 3,
    name: "Closed",
    key: "closed",
    fill: "fill-green-500",
    selected: false,
  },
  {
    id: 3,
    name: "Archived",
    key: "archived",
    fill: "fill-gray-500",
    selected: false,
  },
];

const userSettings = [
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      to:"/settings"
    },
    {
      label: "Billing & Invoices",
      icon: "i-heroicons-currency-rupee",
      to:"/billing"
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
    {
      label: "New Project",
      icon: "i-heroicons-plus-circle",
    },
  ],
];
</script>

<style scoped>
.navlink {
  @apply flex gap-x-3 items-center rounded-md px-2 py-1.5 text-sm leading-6 font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800;
}
.navlink.router-link-exact-active {
  @apply bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white;
}

.navlink-icon {
  @apply h-5 w-5 shrink-0;
}
</style>
