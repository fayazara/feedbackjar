<template>
  <UButton
    v-if="!loggedIn"
    to="/api/auth/google"
    icon="i-simple-icons-google"
    label="Login with Google"
    color="black"
    external
  />
</template>
<script setup>
const { loggedIn } = useUserSession();
</script>
