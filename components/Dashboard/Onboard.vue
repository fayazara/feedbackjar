<template>
  <main class="py-12">
    <DashboardHeader
      class="max-w-4xl"
      title="Get Started"
      subtitle="Let's get you setup"
    />
    <UContainer class="mt-8" :ui="{ constrained: 'max-w-4xl' }">
      <form
        @submit.prevent="onboardUser"
        class="space-y-6 bg-white dark:bg-black p-8 border rounded-xl dark:border-gray-800"
      >
        <UFormGroup name="name" label="Project name" required>
          <UInput v-model="project.name" placeholder="My website" size="lg" />
        </UFormGroup>
        <UFormGroup name="description" label="Project description">
          <UTextarea
            v-model="project.description"
            placeholder="Our marketing website..."
            size="lg"
          />
        </UFormGroup>
        <UFormGroup name="URL" label="Project URL" required>
          <UInput
            v-model="project.website"
            type="url"
            placeholder="https://example.com"
            size="lg"
          >
            <template #leading>
              <UIcon
                v-if="!project.website"
                name="i-heroicons-globe-alt"
                class="h-5 w-5 text-gray-500"
              />
              <UAvatar
                v-else
                :src="`https://logo.clearbit.com/${project.website}`"
                size="2xs"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UButton type="submit" label="Create" size="lg" />
      </form>
    </UContainer>
  </main>
</template>

<script setup>
const project = ref({
  name: "",
  description: "",
  website: "",
});
async function onboardUser() {
  const data = {
    ...project.value,
    avatar: `https://logo.clearbit.com/${project.value.website}`,
    status: "active",
  };
  await fetch("/api/projects/onboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
</script>

<style></style>
