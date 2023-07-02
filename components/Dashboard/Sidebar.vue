<template>
  <div
    class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-1000 px-6"
  >
    <div class="flex h-16 shrink-0 items-center justify-between">
      <div class="flex items-center space-x-2">
        <Logo class="h-8 w-auto" role="img" />
        <span class="font-bold text-xl">Emailjar</span>
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
                {{ item.name }}
                <span
                  v-if="item.count"
                  class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-slate-600 ring-1 ring-inset ring-slate-200"
                  aria-hidden="true"
                  >{{ item.count }}</span
                >
              </NuxtLink>
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
              class="flex items-center w-full justify-between py-3 text-sm font-semibold leading-6 bg-slate-50 dark:bg-slate-950 dark:border-t border-slate-900 px-6"
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

<script setup>
const props = defineProps({
  closeButton: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: () => ({}),
  },
  clear: {
    type: Function,
    required: true,
  },
});
const navigation = [
  { name: "Collections", href: "/dashboard", icon: "heroicons:folder" },
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
</script>

<style>
.navlink {
  @apply flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium text-slate-700 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-50 hover:dark:bg-slate-800;
}
.navlink.router-link-exact-active {
  @apply bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-200;
}

.navlink-icon {
  @apply h-6 w-6 shrink-0 text-slate-400 group-hover:text-indigo-600;
}

.navlink.router-link-exact-active .navlink-icon {
  @apply text-indigo-600;
}
</style>
