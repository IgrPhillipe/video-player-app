export const getIdFromUri = (uri: string): number => {
  const id = uri.split('/').pop();
  return Number(id);
};
