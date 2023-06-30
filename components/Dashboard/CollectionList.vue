<template>
  <div
    class="bg-white dark:bg-slate-950 px-5 border dark:border-slate-800 rounded-xl"
  >
    <ul role="list" class="divide-y divide-slate-100 dark:divide-slate-800">
      <li
        v-for="collection in collections"
        :key="collection.id"
        class="flex items-center justify-between gap-x-6 py-5"
      >
        <div class="min-w-0">
          <div class="flex items-start gap-x-3">
            <p class="text-sm font-semibold leading-6">
              {{ collection.name }}
            </p>
            <UBadge>
              {{
                statuses.find((status) => status.key === collection.status).name
              }}
            </UBadge>
          </div>
          <section class="text-xs leading-5 text-slate-500">
            <div class="mt-1 flex items-center gap-x-2">
              <p class="whitespace-nowrap">
                <time :datetime="formattedDate(collection.createdAt)">{{
                  formattedDate(collection.createdAt)
                }}</time>
              </p>
              <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                <circle cx="1" cy="1" r="1" />
              </svg>
              <p>
                {{ collection.emailsCount }}
                {{ collection.emailsCount === 1 ? `email` : `emails` }}
                collected
              </p>
            </div>
            <p v-if="collection.description" class="mt-2">
              {{ collection.description }}
            </p>
          </section>
        </div>
        <div class="flex flex-none items-center gap-x-4">
          <UButton color="white" variant="solid" label="View Collection" />

          <Menu as="div" class="relative flex-none">
            <MenuButton
              class="-m-2.5 block p-2.5 text-slate-500 hover:text-slate-900"
            >
              <span class="sr-only">Open options</span>
              <UIcon
                name="i-heroicons-ellipsis-vertical"
                class="text-2xl"
                aria-hidden="true"
              />
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <button
                    @click="emit('edit', collection)"
                    :class="[
                      active ? 'bg-slate-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-slate-900 w-full text-left',
                    ]"
                  >
                    Edit<span class="sr-only">, {{ collection.name }}</span>
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-slate-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-slate-900',
                    ]"
                    >Move<span class="sr-only">, {{ collection.name }}</span></a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-slate-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-slate-900',
                    ]"
                    >Delete<span class="sr-only"
                      >, {{ collection.name }}</span
                    ></a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
const emit = defineEmits(["editCollection"]);

const props = defineProps({
  collections: {
    type: Array,
    required: true,
  },
});

function formattedDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear());

  return `${day}-${month}-${year}`;
}

const statuses = [
  {
    key: "active",
    name: "Active",
    color: "primary",
  },
  {
    key: "archived",
    name: "Archived",
    color: "yellow",
  },
  {
    key: "draft",
    name: "Draft",
    color: "rose",
  },
];
</script>
