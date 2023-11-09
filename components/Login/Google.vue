<template>
  <div class="mt-4">
    <div class="flex relative justify-center">
      <div id="buttonDiv" class="mx-auto" />
      <div
        v-if="submitting"
        class="absolute inset-0 bg-gray-300 rounded-full opacity-50"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadScript } from "~/lib/helper";

const submitting = ref(false);
const config = useRuntimeConfig();

const loadGoogleIdentityLibrary = async () => {
  await loadScript("https://accounts.google.com/gsi/client");
  google.accounts.id.initialize({
    client_id: config.public.google.clientId,
    callback: loginCallback,
  });
  google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
    theme: "outline",
    size: "large",
    shape: "rectangular",
    type: "standard",
  });
};
onMounted(() => {
  loadGoogleIdentityLibrary();
});

const loginCallback = async (googleResponse: { credential: any }) => {
  const payload = {
    credential: googleResponse.credential,
  };
  submitting.value = true;
  const response = await $fetch("/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  });
  const { redirectTo } = response;
  submitting.value = false;
  window.location.href = redirectTo;
};
</script>
