<template>
  <div class="min-h-screen bg-slate-100">
    <nav class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <UIcon name="i-heroicons-envelope" class="text-3xl" />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="link in links"
                :key="link.url"
                :to="link.url"
                class="nav-link"
                >{{ link.name }}</NuxtLink
              >
            </div>
          </div>

          <div class="-mr-2 flex items-center">
            <!-- Mobile menu button -->
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
                  class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="px-4 py-3">
                    <p class="text-sm">Signed in as</p>
                    <p class="truncate text-sm font-medium text-gray-900">
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
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
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
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
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
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
const { user, clear, loggedIn } = useUserSession();
definePageMeta({
  middleware: "auth",
});

const links = [
  {
    name: "Lists",
    url: "/dashboard",
  },
  {
    name: "Billing",
    url: "/dashboard/billing",
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
  },
];

const colorMode = useColorMode();

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo("/");
  }
});

function toggleColorMode() {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
}

useHead({
  title: "EmailJar",
  meta: [{ name: "description", content: "Save Email Links" }],
});
</script>

<style scoped>
.nav-link {
  @apply border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium;
}

.nav-link.router-link-exact-active {
  @apply border-indigo-500 text-gray-900;
}
</style>
