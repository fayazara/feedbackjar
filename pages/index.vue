<template>
  <main class="min-h-screen bg-white dark:bg-gray-950">
    <!-- //  Landing page  -->
    <HomeNavbar :loggedIn="loggedIn" />
    <HomeHero />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
</script>
