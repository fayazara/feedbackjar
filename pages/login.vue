<template>
  <div class="flex flex-col flex-1 justify-center px-6 py-12 h-screen lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex justify-center items-center">
        <img height="32" width="32" src="/logo.png" alt="Feedbackjar Logo" />
      </div>
      <h2 class="mt-2 text-2xl font-bold tracking-tight leading-9 text-center">
        Sign in to your account
      </h2>
      <p class="text-center text-gray-500">
        You need to sign in to your account to continue using Feedbackjar
      </p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <LoginGithub/>
      <LoginGoogle/>

      <p class="mt-10 text-sm text-center">
        <UButton to="/" variant="soft" icon="i-heroicons-chevron-left-20-solid">
          Back
        </UButton>
      </p>
    </div>
  </div>
</template>
