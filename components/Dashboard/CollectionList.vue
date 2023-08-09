<template>
  <div
    class="bg-white dark:bg-gray-950 px-5 border dark:border-white/10 rounded-xl"
  >
    <ul role="list" class="divide-y divide-gray-100 dark:divide-gray-900">
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
          <section class="text-xs leading-5 text-gray-500">
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
        <div class="flex flex-none items-center gap-x-2">
          <UButton
            :to="`/dashboard/${collection.id}`"
            color="white"
            variant="solid"
            size="xs"
            label="View Collection"
          />
          <DashboardCollectionActionMenu
            @edit="emit('editCollection', collection)"
            @delete="emit('deleteCollection', collection)"
            @duplicate="emit('duplicateCollection', collection)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const emit = defineEmits([
  "editCollection",
  "deleteCollection",
  "duplicateCollection",
]);

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
