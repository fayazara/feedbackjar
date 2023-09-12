<template>
  <div
    id="g_id_onload"
    :data-client_id="config.public.googleClientId"
    data-context="signin"
    data-ux_mode="popup"
    data-callback="googleLoginCallback"
    data-auto_select="true"
    data-itp_support="true"
  ></div>

  <div
    class="g_id_signin"
    data-type="standard"
    data-shape="pill"
    data-theme="outline"
    data-text="continue_with"
    data-size="large"
    data-logo_alignment="left"
  ></div>
</template>
<script setup>
useHead({
  script: [
    {
      async: true,
      src: "https://accounts.google.com/gsi/client",
      defer: true,
    },
  ],
});
const config = useRuntimeConfig();

if (process.client) {
  if (process.client) {
    window.googleLoginCallback = (userData) => {
      console.log("ud", userData);
      $fetch(`/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
            credential: userData.credential
        },
      });
    };
  }
}
</script>
