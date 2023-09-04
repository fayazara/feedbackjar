<template>
  <main class="home">
    <HomeNavbar :loggedIn="loggedIn" :stars="data.stargazers_count" />
    <HomeHero :loggedIn="loggedIn" />
    <HomeExplainer />
    <HomeOpenSource :stars="data.stargazers_count" />
    <HomeIntegrations />
    <HomeFooter />
  </main>
</template>

<script setup>
const { loggedIn } = useUserSession();
const { data } = useFetch("https://api.github.com/repos/fayazara/feedbackjar", {
  pick: ["stargazers_count"],
});
</script>

<style scoped>
.home {
  @apply bg-white dark:bg-gray-950 min-h-screen bg-[length:1rem_1rem] bg-[radial-gradient(circle,#eceeef_1px,transparent_0)] dark:bg-[radial-gradient(circle,#1f1f1f_1px,transparent_0)];
}
</style>
