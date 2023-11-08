<template>
  <UButton
    v-if="!loggedIn"
    to="/api/auth/github"
    icon="i-simple-icons-github"
    label="Login with Github"
    color="black"
    external
  />
</template>
<script setup>
const { loggedIn } = useUserSession();
</script>
