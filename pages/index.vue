<template>
  <main
    class="bg-white dark:bg-gray-950 min-h-screen bg-[length:1rem_1rem] bg-[radial-gradient(circle,#dee2e6_1px,transparent_0)] dark:bg-[radial-gradient(circle,#1f1f1f_1px,transparent_0)]"
  >
    <nav class="h-16 max-w-4xl mx-auto flex items-center justify-between px-6">
      <div class="flex items-center gap-x-2">
        <Logo class="h-8 w-auto" />
        <span class="text-lg font-bold font-display">Feedbackjar</span>
      </div>
      <div>
        <div class="items-center gap-x-4 hidden md:flex">
          <UButton
            variant="ghost"
            color="gray"
            class="transition-transform active:scale-[0.98]"
            to="/"
            >Pricing</UButton
          >
          <UButton
            variant="ghost"
            color="gray"
            class="transition-transform active:scale-[0.98] flex items-center gap-x-1"
            to="/"
          >
            <span> Github </span>
            <Icon name="heroicons:star-20-solid" />
            <span>
              {{ data.repo.stars }}
            </span>
          </UButton>
          <UButton
            variant="ghost"
            color="gray"
            class="transition-transform active:scale-[0.98]"
            to="/"
            >Docs</UButton
          >
          <UButton
            variant="ghost"
            color="gray"
            class="transition-transform active:scale-[0.98]"
            :to="loggedIn ? '/dashboard' : '/api/auth/github'"
            external
            >{{ loggedIn ? "Dashboard" : "Login" }}</UButton
          >
          <ThemeToggle />
        </div>
      </div>
    </nav>
    <section class="py-16 md:py-32 px-6 lg:px-0 max-w-4xl mx-auto">
      <div class="space-y-5 max-w-xl">
        <h1 class="font-display text-2xl md:text-4xl font-bold">
          Collect feedback effortlessly from websites, mobile apps, with a link
          or a QR code.
        </h1>
        <p
          class="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
        >
          We provide you the tools to collect, manage and close feedback, ideas,
          suggestions, bugs or anything else.
        </p>
        <div class="!mt-10">
          <UButton
            :to="loggedIn ? '/dashboard' : '/api/auth/github'"
            size="xl"
            color="black"
            :ui="{ rounded: 'rounded-lg' }"
            variant="solid"
            class="transition-transform active:scale-[0.98]"
            external
          >
            {{ loggedIn ? "Go to dashboard" : "Sign up with Github" }}
          </UButton>
        </div>
      </div>
    </section>
    <section
      class="rounded-none md:rounded-xl max-w-4xl mx-auto overflow-hidden ring-8 ring-gray-200 dark:ring-white/10"
    >
      <img src="/feedbackjar-dashboard.png" alt="Feedbackjar dashboard" />
    </section>
    <section class="py-16 md:py-32 px-6 lg:px-0 max-w-4xl mx-auto">
      <div class="space-y-5 max-w-xl">
        <h2 class="font-display text-2xl md:text-4xl font-bold">
          What is Feedbackjar?
        </h2>
        <p
          class="text-base md:text-lg font-medium text-gray-600 dark:text-gray-400"
        >
          Everything you need to collect, manage and close feedback, ideas. By
          everything we mean everything from feedback to public roadmaps to
          changelogs.
        </p>
      </div>
      <div class="mt-5 space-y-5">
        <div class="grid grid-cols-3 gap-5">
          <div class="h-64 bg-gray-100 border rounded-xl"></div>
          <div class="h-64 bg-gray-100 border rounded-xl"></div>
          <div class="h-64 bg-gray-100 border rounded-xl"></div>
        </div>
        <div class="grid grid-cols-5 gap-5">
          <div class="h-40 col-span-3 bg-gray-100 border rounded-xl"></div>
          <div class="h-40 col-span-2 bg-gray-100 border rounded-xl"></div>
        </div>
        <div class="grid grid-cols-5 gap-5">
          <div class="h-40 col-span-2 bg-gray-100 border rounded-xl"></div>
          <div class="h-40 col-span-3 bg-gray-100 border rounded-xl"></div>
        </div>
      </div>
      div
    </section>
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
const { data } = useFetch("https://ungh.cc/repos/fayazara/feedbackjar");
</script>
