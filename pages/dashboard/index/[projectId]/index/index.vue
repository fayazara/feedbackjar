<template>
  <!-- <DashboardHeader
    title="Overview"
    subtitle="Project insights, feedback list and overview"
  /> -->
  <main>
    <header>
      <!-- Secondary navigation -->
      <nav class="flex overflow-x-auto border-b border-white/10 py-4">
        <ul
          role="list"
          class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
        >
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a
              :href="item.href"
              :class="item.current ? 'text-indigo-400' : ''"
              >{{ item.name }}</a
            >
          </li>
        </ul>
      </nav>

      <!-- Heading -->
      <div
        class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
      >
        <div>
          <div class="flex items-center gap-x-3">
            <UAvatar
              src="https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png"
              size="2xs"
            />
            <h1 class="flex gap-x-3 text-base leading-7">
              <span class="font-semibold text-white">Dribbble</span>
              <span class="text-gray-600">/</span>
              <span class="font-semibold text-white">website</span>
            </h1>
          </div>
          <p class="mt-2 text-xs leading-6 text-gray-400">
            Feedback collected from the Dribble website
          </p>
        </div>
        <UButton
          label="Add"
          icon="i-heroicons-plus-circle"
          color="white"
        ></UButton>
      </div>

      <!-- Stats -->
      <div
        class="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-6"
      >
        <div
          v-for="(stat, statIdx) in stats"
          :key="stat.name"
          :class="[
            statIdx % 2 === 1
              ? 'sm:border-l'
              : statIdx === 2
              ? 'lg:border-l'
              : '',
            'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8',
          ]"
        >
          <p class="text-sm font-medium leading-6 text-gray-400">
            {{ stat.name }}
          </p>
          <p class="mt-2 flex items-baseline gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              stat.value
            }}</span>
            <span v-if="stat.unit" class="text-sm text-gray-400">{{
              stat.unit
            }}</span>
          </p>
        </div>
      </div>
    </header>

    <!-- Activity list -->
    <div class="border-t border-white/10 pt-11">
      <h2
        class="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8"
      >
        Latest activity
      </h2>
      <table class="mt-6 w-full whitespace-nowrap text-left">
        <colgroup>
          <col class="w-full sm:w-4/12" />
          <col class="lg:w-4/12" />
          <col class="lg:w-2/12" />
          <col class="lg:w-1/12" />
          <col class="lg:w-1/12" />
        </colgroup>
        <thead class="border-b border-white/10 text-sm leading-6 text-white">
          <tr>
            <th
              scope="col"
              class="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              User
            </th>
            <th
              scope="col"
              class="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Message
            </th>
            <th
              scope="col"
              class="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
            >
              Type
            </th>
            <th
              scope="col"
              class="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="item in feedbackSubmissions" :key="item.commit">
            <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
              <div class="flex items-center gap-x-4">
                <img
                  :src="item.user.imageUrl"
                  alt=""
                  class="h-8 w-8 rounded-full bg-gray-800 ring-2 ring-white/10"
                />
                <div class="truncate text-sm font-medium leading-6 text-white">
                  {{ item.user.name }}
                </div>
              </div>
            </td>
            <td class="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
              <div class="flex gap-x-3">
                <div class="truncate font-mono text-sm leading-6 text-gray-400">
                  {{ item.message }}
                </div>
              </div>
            </td>
            <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
              <div
                class="flex items-center justify-end gap-x-2 sm:justify-start"
              >
                <time
                  class="text-gray-400 sm:hidden"
                  :datetime="item.dateTime"
                  >{{ item.date }}</time
                >
                <div
                  :class="[
                    statuses[item.category],
                    'flex-none rounded-full p-1',
                  ]"
                >
                  <div class="h-1.5 w-1.5 rounded-full bg-current" />
                </div>
                <div class="hidden text-white sm:block">
                  {{ item.category }}
                </div>
              </div>
            </td>
            <td
              class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8"
            >
              <time :datetime="item.dateTime">{{ item.date }}</time>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
const secondaryNavigation = [
  { name: "Overview", href: "#", current: true },
  { name: "All Activity", href: "#", current: false },
  { name: "Collaborators", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];
const stats = [
  { name: "Total feedbacks", value: "405" },
  { name: "Issues", value: "134" },
  { name: "Ideas", value: "233" },
  { name: "Other", value: "90" },
  { name: "Open", value: "112" },
  { name: "Closed", value: "335" },
];
const statuses = {
  Idea: "text-sky-400 bg-sky-400/10",
  Issue: "text-rose-400 bg-rose-400/10",
  Other: "text-yellow-400 bg-yellow-400/10",
};
const feedbackSubmissions = [
  {
    user: {
      name: "Emily Chen",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Emily%20Chen",
    },
    message:
      "Can you please add a dark mode option? It would make the app easier on the eyes.",
    category: "Idea",
    status: "Open",
    date: "2 hours ago",
    dateTime: "2023-07-13T09:30",
  },
  {
    user: {
      name: "Anonymous",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Anonymous",
    },
    message:
      "I found a typo in the user manual. It's on page 15, under the 'Account Settings' section.",
    category: "Issue",
    status: "Open",
    date: "3 hours ago",
    dateTime: "2023-07-13T08:30",
  },
  {
    user: {
      name: "Joe Goldberd",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Joe%20Goldberd",
    },
    message:
      "I think the font size is too small. Can you make it bigger or add an option to adjust the font size?",
    category: "Idea",
    status: "In Progress",
    date: "4 hours ago",
    dateTime: "2023-07-13T07:30",
  },
  {
    user: {
      name: "David Brown",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=David%20Brown",
    },
    message:
      "I keep getting logged out of my account. It's very frustrating. Can you please fix this issue?",
    category: "Issue",
    status: "In Progress",
    date: "5 hours ago",
    dateTime: "2023-07-13T06:30",
  },
  {
    user: {
      name: "Jessica Wang",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Jessica%20Wang",
    },
    message:
      "I love the new design, but the color scheme is too bright. Can you add a darker theme?",
    category: "Idea",
    status: "Open",
    date: "6 hours ago",
    dateTime: "2023-07-13T05:30",
  },
  {
    user: {
      name: "Jonathan Lee",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Jonathan%20Lee",
    },
    message:
      "The app keeps crashing when I try to open a file. Can you please investigate this issue?",
    category: "Issue",
    status: "In Progress",
    date: "7 hours ago",
    dateTime: "2023-07-13T04:30",
  },
  {
    user: {
      name: "Jennifer Kim",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Jennifer%20Kim",
    },
    message:
      "I think there's a bug in the search function. When I type in a keyword, it doesn't always show the relevant results.",
    category: "Issue",
    status: "Open",
    date: "8 hours ago",
    dateTime: "2023-07-13T03:30",
  },
  {
    user: {
      name: "Kevin Chen",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Kevin%20Chen",
    },
    message: "I accidentally deleted a file. Is there a way to recover it?",
    category: "Other",
    status: "Open",
    date: "9 hours ago",
    dateTime: "2023-07-13T02:30",
  },
  {
    user: {
      name: "Michelle Lee",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Michelle%20Lee",
    },
    message:
      "I have a suggestion for a new feature. Can you add a 'Favorites' section so I can easily access my most frequently used files?",
    category: "Idea",
    status: "Open",
    date: "10 hours ago",
    dateTime: "2023-07-13T01:30",
  },
  {
    user: {
      name: "Daniel Kim",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Daniel%20Kim",
    },
    message:
      "The app is running very slowly. Can you optimize the code or improve the server performance?",
    category: "Issue",
    status: "In Progress",
    date: "11 hours ago",
    dateTime: "2023-07-13T00:30",
  },
  {
    user: {
      name: "Ava Wang",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Ava%20Wang",
    },
    message:
      "I think the UI could be more user-friendly. Can you simplify the menu and navigation?",
    category: "Idea",
    status: "Open",
    date: "12 hours ago",
    dateTime: "2023-07-12T23:30",
  },
  {
    user: {
      name: "Eric Lee",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Eric%20Lee",
    },
    message:
      "I can't access my account even though I'm using the correct login credentials. Can you help me reset my password?",
    category: "Issue",
    status: "Open",
    date: "13 hours ago",
    dateTime: "2023-07-12T22:30",
  },
  {
    user: {
      name: "Sophia Chen",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Sophia%20Chen",
    },
    message:
      "I accidentally shared a file with the wrong user. Can you revoke their access?",
    category: "Other",
    status: "Open",
    date: "14 hours ago",
    dateTime: "2023-07-12T21:30",
  },
  {
    user: {
      name: "Matthew Kim",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Matthew%20Kim",
    },
    message:
      "I keep getting an error message when I try to save a file. Can you fix this issue?",
    category: "Issue",
    status: "In Progress",
    date: "15 hours ago",
    dateTime: "2023-07-12T20:30",
  },
  {
    user: {
      name: "Olivia Lee",
      imageUrl: "https://api.dicebear.com/6.x/initials/svg?seed=Olivia%20Lee",
    },
    message:
      "I think the app could use some more features. Can you add support for video files?",
    category: "Idea",
    status: "Open",
    date: "16 hours ago",
    dateTime: "2023-07-12T19:30",
  },
];
</script>
