<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center justify-center">
        <UAvatar src="https://github.com/fayazara.png" alt="Avatar" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 dark:divide-gray-900 rounded-md bg-white dark:bg-gray-950 border dark:border-white/10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-4 py-3">
          <p class="text-sm">Signed in as</p>
          <p
            class="truncate text-sm font-medium text-gray-900 dark:text-gray-500"
          >
            {{ user?.name || user?.email || user?.login || "" }}
          </p>
        </div>
        <div class="py-1">
          <MenuItem
            v-slot="{ active }"
            v-for="link in links"
            :key="link.url"
            :to="link.url"
          >
            <NuxtLink
              :to="link.url"
              :class="[
                active
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  : 'text-gray-00 dark:text-gray-300',
                'block px-4 py-2 text-sm',
              ]"
              >{{ link.name }}</NuxtLink
            >
          </MenuItem>
        </div>
        <div class="py-1">
          <form method="POST" action="#">
            <MenuItem v-slot="{ active }">
              <button
                type="button"
                @click="clear"
                :class="[
                  active
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300',
                  'block w-full px-4 py-2 text-left text-sm',
                ]"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  clear: {
    type: Function,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
});
</script>
