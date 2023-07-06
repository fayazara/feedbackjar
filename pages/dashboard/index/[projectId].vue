<template>
  <DashboardHeader
    :title="emailCollection?.collection.name"
    :subtitle="emailCollection?.collection.description"
    :loading="pending"
  >
    <UButton
      icon="i-heroicons-plus-small-20-solid"
      color="white"
      variant="solid"
      label="New Email"
    />
  </DashboardHeader>
  <DashboardPageContainer :loading="pending">
    <div>
      <div class="flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div class="relative">
              <table
                class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-900"
              >
                <thead>
                  <tr>
                    <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                      <UCheckbox
                        :checked="
                          indeterminate ||
                          selectedEmails.length === emailCollection?.emails.length
                        "
                        :indeterminate="indeterminate"
                        @change="
                          selectedEmails = $event.target.checked
                            ? email.map((p) => p.email)
                            : []
                        "
                      />
                    </th>
                    <th
                      scope="col"
                      class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Origin
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Created At
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-900">
                  <tr
                    v-for="email in emailCollection?.emails"
                    :key="email.id"
                    :class="[
                      selectedEmails.includes(email.emailId) &&
                        'bg-gray-100 dark:bg-black',
                    ]"
                  >
                    <td class="relative px-7 sm:w-12 sm:px-6">
                      <div
                        v-if="selectedEmails.includes(email.emailId)"
                        class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                      ></div>
                      <UCheckbox
                        :value="email.emailId"
                        v-model="selectedEmails"
                      />
                    </td>
                    <td
                      :class="[
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedEmails.includes(email.emailId)
                          ? 'text-indigo-600'
                          : '',
                      ]"
                    >
                      {{ email.emailId }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ email.origin }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ email.status }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ email.createdAt }}
                    </td>
                    <td
                      class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3"
                    >
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">
                        Edit<span class="sr-only">, {{ email.name }}</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardPageContainer>
</template>

<script setup>
const { emailCollection, pending } = useEmail();

const selectedEmails = ref([]);
const checked = ref(false);
const indeterminate = computed(
  () =>
    selectedEmails.value.length > 0 &&
    selectedEmails.value.length < emailCollection?.emails.length
);
</script>
