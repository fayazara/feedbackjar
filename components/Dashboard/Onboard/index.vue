<template>
  <main class="grid grid-cols-3">
    <div
      class="h-[calc(100vh-3.5rem)] sticky top-0 border-r bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-white/10"
    >
      <div class="py-12 px-6">
        <DashboardHeader title="Get Started" subtitle="Let's get you setup." />
        <div class="mt-12 space-y-6">
          <DashboardOnboardTimeline
            title="Create your first project"
            description="A place on the internet where you can collect feedback from your users and customer. This could be a website, a mobile app, or even a native desktop application."
            :active="activeTab === 'project'"
            :completed="activeTab !== 'project'"
            :trail="true"
          />
          <DashboardOnboardTimeline
            title="Add your first idea"
            description="A bug, idea, or suggestion from your users. You can add ideas manually or integrate with one of our supported platforms."
            :active="activeTab === 'idea'"
            :completed="activeTab !== 'idea'"
            :trail="true"
          />
          <DashboardOnboardTimeline
            title="Invite your team"
            description="Invite your team to collaborate on your projects. "
            :active="activeTab === 'teams'"
            :completed="activeTab !== 'teams'"
            :trail="false"
          />
        </div>
      </div>
    </div>
    <div
      class="col-span-2 h-full flex flex-col items-center justify-center bg-white dark:bg-gray-950"
    >
      <Transition name="scroll" mode="out-in">
        <DashboardOnboardProjectForm
          v-if="activeTab === 'project'"
          @nextab="activeTab = 'idea'"
        />
        <DashboardOnboardIdeaForm
          v-else-if="activeTab === 'idea'"
          @nextab="activeTab = 'teams'"
        />
        <DashboardOnboardTeamsForm v-else />
      </Transition>
    </div>
  </main>
</template>
<script setup>
const activeTab = ref("project");
const projectId = useState("projectId", () => null);
</script>

<style scoped>
.scroll-enter-active,
.scroll-leave-active {
  transition-duration: 0.3s !important;
  transition-timing-function: ease-out !important;
}

.scroll-move {
  transition-duration: 0.5s !important;
  transition-property: transform !important;
  transition-timing-function: ease-out !important;
}

.scroll-enter-from,
.scroll-leave-to {
  opacity: 0;
}

.scroll-enter-from {
  transform: translateY(15px);
}

.scroll-leave-to {
  transform: translateY(-15px);
}

.scroll-enter-active,
.scroll-leave-active {
  transition-property: transform, opacity !important;
}
</style>
