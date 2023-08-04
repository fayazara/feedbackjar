<template>
  <main class="grid grid-cols-3">
    <div
      class="h-[calc(100vh-3.5rem)] sticky top-0 border-r border-gray-200 dark:border-gray-900"
    >
      <div class="py-12 px-6">
        <DashboardHeader title="Get Started" subtitle="Let's get you setup." />
        <div class="mt-12 space-y-6">
          <DashboardOnboardTimeline
            title="Create your first project"
            description="A place on the internet where you can collect feedback from your users and customer. This could be a website, a mobile app, or even a native desktop application."
            :active="true"
            :trail="true"
          />
          <DashboardOnboardTimeline
            title="Add your first idea"
            description="A bug, idea, or suggestion from your users. You can add ideas manually or integrate with one of our supported platforms."
            :active="false"
            :trail="true"
          />
          <DashboardOnboardTimeline
            title="Invite your team"
            description="Invite your team to collaborate on your projects. "
            :active="false"
            :trail="false"
          />
        </div>
      </div>
    </div>
    <div class="col-span-2 h-full flex items-center justify-center bg-white dark:bg-gray-900">
      <form @submit.prevent="onboardUser" class="space-y-6 max-w-lg w-full">
        <UFormGroup
          name="name"
          label="Project name"
          :error="
            invalidFields.find((field) => field.field === 'name')?.message
          "
        >
          <UInput v-model="project.name" placeholder="My website" size="lg" />
        </UFormGroup>
        <UFormGroup
          name="description"
          label="Project description"
          :error="
            invalidFields.find((field) => field.field === 'description')
              ?.message
          "
        >
          <UTextarea
            v-model="project.description"
            placeholder="Our marketing website..."
            size="lg"
          />
        </UFormGroup>

        <UFormGroup
          name="URL"
          label="Project URL"
          :error="
            invalidFields.find((field) => field.field === 'website')?.message
          "
        >
          <UInput
            v-model="project.website"
            type="url"
            placeholder="https://example.com"
            size="lg"
          />
        </UFormGroup>
        <div>
          <div>
            <p
              class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Project Logo
            </p>
            <div class="flex items-center space-x-3 mt-3">
              <div
                class="rounded-xl h-16 w-16 flex bg-gray-100 items-center justify-center"
              >
                <UAvatar
                  :src="
                    project.website
                      ? `https://logo.clearbit.com/${project.website}`
                      : `https://api.dicebear.com/6.x/shapes/svg?seed=${project}`
                  "
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
        <UButton
          :loading="loading"
          type="submit"
          variant="solid"
          color="black"
          label="Create project"
          size="lg"
        />
      </form>
    </div>
  </main>
</template>

<script setup>
const router = useRouter();
import { z } from "zod";
const project = ref({
  name: "",
  description: "",
  website: "",
});

const formSchema = z.object({
  name: z.string().min(3).nonempty(),
  description: z.string().min(3),
  website: z.string().url().nonempty(),
});

const invalidFields = ref([]);
const loading = ref(false);
async function onboardUser() {
  const result = formSchema.safeParse(project.value);
  if (!result.success) {
    invalidFields.value = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return;
  }
  const data = {
    ...project.value,
    avatar: `https://logo.clearbit.com/${project.value.website}`,
    status: "active",
  };
  try {
    loading.value = true;
    const project = await fetch("/api/projects/onboard", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push({ path: `/dashboard/${project.id}` });
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
