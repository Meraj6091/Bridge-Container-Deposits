export const getDefaultValueForSelect = (data) => {
  if (data) {
    return { label: data, value: data };
  }
  return null;
};
