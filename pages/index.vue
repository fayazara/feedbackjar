<template>
  <main class="min-h-screen bg-white dark:bg-slate-1000">
    <HomeNavbar :loggedIn="loggedIn" />
    <HomeHero />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>
