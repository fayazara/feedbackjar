<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <UContainer class="py-32">
      <div class="mb-2 flex justify-center">
        <NuxtLink
          class="bg-gray-100 dark:bg-gray-900 rounded-2xl px-4 py-1.5 text-sm font-medium"
          to="https://twitter.com/fayazara"
          >Follow along on twitter</NuxtLink
        >
      </div>
      <div class="text-center">
        <h1
          class="text-4xl font-bold tracking-tight sm:text-6xl"
          style="text-wrap: balance"
        >
          An example app built using Nuxt 3, Drizzle ORM, Turso and TailwindCSS.
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-500 max-w-2xl mx-auto">
          I'm building a web app with Nuxt 3 and open sourcing everything.
          Follow along as we figure this out together.
        </p>
        <div class="mt-6 flex items-center justify-center gap-x-2">
          <UButton to="/dashboard" size="lg" color="white" variant="solid">Get started</UButton>
          <UButton
            size="lg"
            external
            to="https://github.com/fayazara/feedbackjar"
            target="_blank"
            color="white"
            variant="soft"
            >Github</UButton
          >
        </div>
      </div>
    </UContainer>
  </div>
</template>
