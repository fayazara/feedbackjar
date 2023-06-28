<template>
  <main class="min-h-screen bg-white dark:bg-slate-950">
    <HomeNavbar :loggedIn="loggedIn" />
    <HomeHero />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>
