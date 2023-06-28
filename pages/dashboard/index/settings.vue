<template>
  <DashboardHeader
    title="Settings"
    subtitle="Manage account and website settings."
  />
  <DashboardPageContainer>
    <div
      class="flex p-4 border rounded-2xl bg-white dark:bg-slate-950 dark:border-slate-800"
    >
      <UAvatar :src="user.avatar_url" :alt="user.name" size="3xl" />
      <div class="ml-6">
        <p class="text-2xl font-bold">{{ user.name }}</p>
        <p class="text-slate-500 text-sm">{{ user.bio }}</p>
        <div class="mt-2 flex items-center space-x-2">
          <UBadge v-if="user.location">
            <UIcon name="i-heroicons-map-pin" class="mr-1" />
            <span>{{ user.location }}</span>
          </UBadge>
          <UBadge v-if="user.twitter_username">
            <UIcon name="i-mdi-twitter" class="mr-1" />
            <span>@{{ user.twitter_username }}</span>
          </UBadge>
          <UBadge v-if="user.login">
            <UIcon name="i-mdi-github" class="mr-1" />
            <span>{{ user.login }}</span>
          </UBadge>
          <UBadge v-if="user.email">
            <UIcon name="i-heroicons-envelope" class="mr-1" />
            <span>{{ user.email }}</span>
          </UBadge>
          <UBadge v-if="user.blog">
            <UIcon name="i-heroicons-document" class="mr-1" />
            <span>{{ user.blog }}</span>
          </UBadge>
        </div>
      </div>
    </div>
  </DashboardPageContainer>
</template>

<script setup>
const { user } = useUserSession();
</script>
