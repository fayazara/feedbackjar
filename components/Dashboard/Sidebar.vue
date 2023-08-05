<template>
  <div class="sidebar">
    <div class="header">
      <div class="logo">
        <Logo class="logo-icon" role="img" />
        <span class="logo-text">Feedbackjar</span>
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
    <nav class="menu">
      <USelectMenu
        v-if="!isAccountRoute"
        v-model="selectedProject"
        :options="projects"
        :popper="{ placement: 'bottom-start' }"
      >
        <template #label>
          <UIcon
            v-if="selectedProject.icon"
            :name="selectedProject.icon"
            class="w-4 h-4"
          />
          <UAvatar
            v-else-if="selectedProject.avatar"
            v-bind="selectedProject.avatar"
            size="3xs"
          />

          {{ selectedProject.label }}
        </template>
      </USelectMenu>
      <ul role="list" class="menu-list">
        <li>
          <ul role="list" class="submenu">
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
                <span>{{ item.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li v-if="!isAccountRoute">
          <div class="filter-header">FILTER</div>
          <ul role="list" class="filter-list">
            <li v-for="filter in filters" :key="filter.key">
              <button
                @click="selectedFilter = filter.key"
                :class="[
                  'filter-button group',
                  { selected: selectedFilter === filter.key },
                ]"
              >
                <div class="flex-none rounded-full p-1" :class="filter.pill">
                  <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                </div>
                <span class="filter-name">{{ filter.name }}</span>
                <span v-if="selectedFilter === filter.key" aria-hidden="true"
                  >&rarr;</span
                >
              </button>
            </li>
          </ul>
        </li>
        <li class="user-settings">
          <UDropdown
            :items="userSettings"
            class="user-settings-dropdown"
            :ui="{ width: 'w-[14rem]' }"
            :popper="{ placement: 'bottom-start' }"
          >
            <button class="user-settings-button">
              <div class="user-avatar">
                <UAvatar :src="user.avatarUrl" :alt="user.name" />
              </div>
              <span class="user-name">{{ user.name }}</span>
              <Icon
                name="heroicons:ellipsis-vertical"
                class="user-settings-icon"
              />
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
}

const props = defineProps<Props>();
const route = useRoute();
const selectedFilter = ref("all");
const selectedProject = ref({
  label: "Dribbble",
  avatar: {
    src: "https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png",
  },
});

const isAccountRoute = computed(
  () =>
    route.path === "/dashboard" ||
    route.path === "/dashboard/" ||
    route.path === "/dashboard/get-started" ||
    route.path === "/dashboard/get-started/" ||
    accountNavigationLinks.map((item) => item.href).includes(route.path)
);

const navigation = computed(() =>
  isAccountRoute.value ? accountNavigationLinks : projectNavigationLinks
);

const projectNavigationLinks = [
  {
    name: "Overview",
    href: "/dashboard/overview",
    icon: "heroicons:chart-pie",
  },
  {
    name: "Activity",
    href: "/dashboard/feedback",
    icon: "heroicons:archive-box-arrow-down",
  },
  {
    name: "Collaborators",
    href: "/dashboard/feedback",
    icon: "heroicons:users",
  },
  {
    name: "Settings",
    href: "/dashboard/feedback",
    icon: "heroicons:cog-6-tooth",
  },
];
const accountNavigationLinks = [
  {
    name: "Projects",
    href: "/dashboard",
    icon: "heroicons:folder",
  },
  {
    name: "Account",
    href: "/dashboard/account",
    icon: "heroicons:cog-6-tooth",
  },
  {
    name: "API Keys",
    href: "/dashboard/api-keys",
    icon: "heroicons:lock-closed",
  },
  {
    name: "Webhooks",
    href: "/dashboard/webhooks",
    icon: "heroicons:arrows-up-down",
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: "heroicons:user-group",
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: "heroicons:currency-rupee",
  },
];

const filters = [
  {
    id: 1,
    name: "All",
    key: "all",
    pill: "text-indigo-400 bg-indigo-400/10",
    selected: false,
  },
  {
    id: 2,
    name: "Issues",
    key: "issues",
    pill: "text-rose-400 bg-rose-400/10",
    selected: false,
  },
  {
    id: 3,
    name: "Ideas",
    key: "Ideas",
    pill: "text-sky-400 bg-sky-400/10",
    selected: false,
  },
  {
    id: 3,
    name: "Other",
    key: "other",
    pill: "text-yellow-400 bg-yellow-400/10",
    selected: false,
  },
  {
    id: 3,
    name: "Closed",
    key: "closed",
    pill: "text-green-400 bg-green-400/10",
    selected: false,
  },
  {
    id: 3,
    name: "Archived",
    key: "archived",
    pill: "text-gray-400 bg-gray-400/10",
    selected: false,
  },
];

const userSettings = [
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      to: "/dashboard/account",
    },
    {
      label: "Billing & Invoices",
      icon: "i-heroicons-currency-rupee",
      to: "/dashboard/billing",
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: props.clear,
    },
  ],
];

// mock projects list
const projects = [
  {
    label: "Dribbble",
    avatar: {
      src: "https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png",
    },
  },
  {
    label: "Figma",
    avatar: { src: "https://static.figma.com/app/icon/1/icon-128.png" },
  },
  {
    label: "Gleap",
    avatar: {
      src: "https://uploads-ssl.webflow.com/634eb51a43522eda9b21e8c3/63c5a7a9ad3731514682c748_android-chrome-512x512.png",
    },
  },
  { label: "New Project", icon: "i-heroicons-plus-circle" },
];
</script>

<style scoped>
.sidebar {
  @apply flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 px-4;
}

.header {
  @apply flex h-14 shrink-0 items-center justify-between;
}

.logo {
  @apply flex items-center space-x-2;
}

.logo-icon {
  @apply h-6 w-auto;
}

.logo-text {
  @apply font-semibold text-lg font-display;
}

.menu {
  @apply flex flex-1 flex-col;
}

.project-dropdown {
  @apply mb-8 w-full;
}

.project-button {
  @apply text-left p-1.5;
}

.project-name {
  @apply flex-grow text-sm;
}

.menu-list {
  @apply flex flex-1 flex-col gap-y-7;
}

.submenu {
  @apply space-y-1;
}

.navlink {
  @apply flex gap-x-3 items-center rounded-md px-2 py-1.5 text-sm leading-6 font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800;
}

.navlink.router-link-exact-active {
  @apply bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white;
}

.navlink-icon {
  @apply h-5 w-5 shrink-0;
}

.filter-header {
  @apply text-xs font-semibold leading-6 text-gray-400;
}

.filter-list {
  @apply -mx-2 mt-2 space-y-1;
}

.filter-button {
  @apply flex items-center text-left gap-x-3 rounded-md py-1.5 px-2 text-sm font-semibold text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800 w-full;
}

.filter-button.selected {
  @apply bg-gray-100 dark:bg-gray-800;
}

.filter-icon {
  @apply h-2 w-2;
}

.filter-name {
  @apply flex-1;
}

.user-settings {
  @apply -mx-4 mt-auto relative;
}

.user-settings-dropdown {
  @apply w-full;
}

.user-settings-button {
  @apply flex items-center w-full py-2.5 text-sm font-semibold leading-6 bg-gray-50 dark:bg-gray-950 dark:border-t border-gray-900 px-4;
}

.user-avatar {
  @apply flex items-center gap-x-4;
}

.user-name {
  @apply flex-shrink-0 ml-2;
}

.user-settings-icon {
  @apply h-6 w-6 ml-auto -mr-2;
}
</style>
