<template>
  <main class="min-h-screen bg-white dark:bg-[#040617] relative">
    <img src="/flare.png" alt="" class="absolute w-full" />
    <header class="absolute inset-x-0 top-0 z-50">
      <nav
        class="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <NuxtLink
            to="/"
            class="-m-1.5 p-1.5 flex items-center space-x-3 hover:text-gray-200 dark:hover:text-gray-300"
          >
            <Logo class="h-8 w-auto" />
            <span class="text-lg font-bold font-display">Feedbackjar</span>
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <UButton
            variant="ghost"
            color="gray"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            icon="i-heroicons-bars-3"
          >
          </UButton>
        </div>
        <div
          class="hidden lg:flex lg:gap-x-12 text-gray-800 dark:text-gray-300"
        >
          <!-- <UButton
            v-for="item in navigation"
            :to="item.href"
            class="text-sm font-semibold leading-6"
            variant="ghost"
            color="gray"
          >
            {{ item.name }}
          </UButton> -->
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <UButton
            to="/"
            class="font-semibold leading-6"
            variant="ghost"
            color="gray"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </UButton>
        </div>
      </nav>
    </header>

    <div class="relative isolate pt-14">
      <div class="py-24 sm:py-32 lg:pb-40 relative">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-4xl text-center">
            <div
              class="max-w-max mx-auto px-2.5 py-1.5 text-sm bg-gray-50/20 dark:bg-gray-700/20 border border-gray-400 dark:border-gray-500 rounded-full text-gray-700 dark:text-gray-400 font-medium"
            >
              ★ 19 &middot; Star us on Github
            </div>
            <h1
              class="text-4xl font-bold tracking-tights sm:text-6xl mt-4 font-display"
            >
              <span
                class="bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-900 dark:from-white dark:to-white/50"
              >
                Collect feedback from your users without leaving your site
              </span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-500">
              Capture, analyse and close user feedback from one place.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <button
                href="/api/auth/github"
                color="white"
                size="xl"
                class="bg-gray-900 dark:bg-blue-300/10 text-white rounded-lg border dark:border-white/20  px-5 py-2"
              >
                Get started
              </button>
            </div>
          </div>
          <div class="mt-12 flow-root sm:mt-16">
            <div
              class="rounded-xl bg-gray-900/5 dark:bg-gray-100/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4"
            >
              <img
                src="/feedbackjar-dashboard.png"
                alt="App screenshot"
                width="2432"
                height="1442"
                class="rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-100/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Integrations", href: "#" },
  { name: "Company", href: "#" },
];

const { loggedIn } = useUserSession();
</script>
