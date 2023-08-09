<template>
  <div class="max-w-lg w-full">
    <div class="mb-12">
      <h2 class="text-2xl font-bold tracking-tight">
        Invite your team members
      </h2>
      <p class="text-sm">
        Add your team members to collaborate on your projects.
      </p>
    </div>
    <div
      class="p-4 border dark:border-white/10 border-dashed bg-gray-50 dark:bg-gray-900 rounded-xl flex flex-col items-center justify-center"
    >
      <img src="writing-code.png" alt="Work in progress" class="mx-auto" />
      <p class="mt-5 text-gray-700 dark:text-gray-400">
        We're still working on this and we're open source.
      </p>
      <UButton
        class="mt-2"
        external
        to="https://github.com/fayazara/feedbackjar"
        target="_blank"
        color="black"
        variant="solid"
        icon="i-mdi-github"
        label="Follow on GitHub"
      />
    </div>
    <div class="flex items-center justify-center">
      <UButton
        class="mt-2"
        external
        to="/dashboard/1"
        color="gray"
        variant="link"
        label="Go to dashboard"
      />
    </div>
  </div>
</template>
