export const useCollection = (props, emit) => {
  // Listing page code
  const { data: collections } = useFetch("/api/collections");
  const isModalOpen = ref(false);
  const selectedCollection = ref(null);
  const mode = ref("create");
  const toast = useToast();

  const updateCollection = (collection) => {
    if (mode.value === "create") {
      collections.value.push({ ...collection, emailsCount: 0 });
    }
    if (mode.value === "edit") {
      const index = collections.value.findIndex((c) => c.id === collection.id);
      collections.value[index] = collection;
    }
    isModalOpen.value = false;
    selectedCollection.value = null;
    mode.value = "create";
  };

  const closeModal = () => {
    isModalOpen.value = false;
    selectedCollection.value = null;
  };

  const editCollection = (collection) => {
    mode.value = "edit";
    selectedCollection.value = collection;
    isModalOpen.value = true;
  };

  const deleteCollection = async (collection) => {
    try {
      await $fetch(`/api/collections/${collection.id}`, { method: "DELETE" });
      const index = collections.value.findIndex((c) => c.id === collection.id);
      collections.value.splice(index, 1);
      toast.add({
        icon: "i-heroicons-trash",
        title: `Collection "${collection.name}" deleted.`,
        color: "red",
      });
    } catch (error) {
      console.log(error);
      toast.add({
        icon: "i-heroicons-x-circle",
        title: `Error deleting collection "${collection.name}".`,
        color: "red",
      });
    }
  };

  const duplicateCollection = async (collection) => {
    try {
      const duplicatedCollection = await $fetch("/api/collections/", {
        method: "POST",
        body: JSON.stringify({
          name: `${collection.name} (copy)`,
          description: collection.description,
          status: collection.status,
        }),
      });
      collections.value.push({ ...duplicatedCollection, emailsCount: 0 });
      toast.add({
        icon: "i-heroicons-document-duplicate-20-solid",
        title: `Collection "${collection.name}" duplicated.`,
      });
    } catch (error) {
      console.log(error);
      toast.add({
        icon: "i-heroicons-x-circle",
        title: `Error duplicating collection "${collection.name}".`,
        color: "red",
      });
    }
  };

  // Create modal form
  const newCollection = ref({ name: "", description: "", status: "active" });
  const error = ref("");
  const loading = ref(false);

  function saveCollection() {
    error.value = "";

    if (!newCollection.value.name.trim()) {
      error.value = "Collection name is required";
      return;
    }
    loading.value = true;
    const url =
      props.mode === "edit"
        ? `/api/collections/${props.selectedCollection.id}`
        : "/api/collections";

    const method = props.mode === "edit" ? "PATCH" : "POST";
    const title =
      props.mode === "edit"
        ? `Collection "${props.selectedCollection.name}" updated.`
        : `Collection "${newCollection.value.name}" created.`;

    const body = JSON.stringify(newCollection.value);

    $fetch(url, { method, body })
      .then((collection) => {
        toast.add({ icon: "i-heroicons-check-circle", title });
        newCollection.value.name = "";
        newCollection.value.description = "";
        emit("updateCollection", collection);
      })
      .catch((err) => {
        console.log(err);
        if (err.data?.data?.issues) {
          const title = err.data.data.issues
            .map((issue) => issue.message)
            .join("\n");
          toast.add({ title, color: "red" });
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  const headerText = computed(() => {
    return props.mode === "edit" && props.selectedCollection.name
      ? props.selectedCollection.name
      : "Add a new Email Collection";
  });

  const isSaveDisabled = computed(() => {
    return newCollection.value.name.trim().length === 0 || loading.value;
  });

  const saveButtonText = computed(() => {
    return props.mode === "edit" ? "Update" : "Save";
  });

  const initEditMode = () => {
    if (props.mode === "edit") {
      newCollection.value.name = props.selectedCollection.name;
      newCollection.value.description = props.selectedCollection.description;
      newCollection.value.status = props.selectedCollection.status;
    }
  };

  const statuses = [
    { name: "Active", value: "active" },
    { name: "Archived", value: "archived" },
    { name: "Draft", value: "draft" },
  ];

  return {
    collections,
    isModalOpen,
    selectedCollection,
    mode,
    toast,
    newCollection,
    error,
    loading,
    headerText,
    isSaveDisabled,
    saveButtonText,
    statuses,
    saveCollection,
    initEditMode,
    updateCollection,
    closeModal,
    editCollection,
    deleteCollection,
    duplicateCollection,
  };
};
