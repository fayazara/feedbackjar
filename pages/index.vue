<template>
  <main class="home">
    <HomeNavbar :loggedIn="loggedIn" :stars="data.repo.stars" />
    <HomeHero :loggedIn="loggedIn" />
    <HomeExplainer />
    <HomeOpenSource :stars="data.repo.stars" />
    <HomeIntegrations />
    <HomeFooter />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
const { data } = useFetch("https://ungh.cc/repos/fayazara/feedbackjar");
</script>

<style scoped>
.home {
  @apply bg-white dark:bg-gray-950 min-h-screen bg-[length:1rem_1rem] bg-[radial-gradient(circle,#eceeef_1px,transparent_0)] dark:bg-[radial-gradient(circle,#1f1f1f_1px,transparent_0)];
}
</style>
