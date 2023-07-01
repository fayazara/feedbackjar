// type Email = {
//   id: number,
//   collectionId: number,
//   emailId: string,
//   createdAt: string,
//   status: string,
//   origin: string,
// };

// type Collection = {
//   id: number,
//   userId: number,
//   name: string,
//   description: string,
//   status: string,
//   createdAt: string,
// };

// type EmailCollection = {
//   collection: Collection,
//   emails: Email[],
// };

export const useEmail = () => {
  const route = useRoute();
  const { data: emailCollection, pending } = useFetch(
    `/api/collections/${route.params.collectionId}/emails`
  );
  return {
    emailCollection,
    pending,
  };
};
