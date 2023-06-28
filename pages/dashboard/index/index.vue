<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Dashboard
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <code>
        {{ user }}
      </code>
    </div>
  </main>
</template>

<script setup>
const { user } = useUserSession();
</script>

<style></style>
