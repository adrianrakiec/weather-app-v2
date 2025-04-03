export const useDefaultLayout = () => {
  const isSiderActive = ref(true);

  const handleToggleSider = () => {
    isSiderActive.value = !isSiderActive.value;
  };

  return {
    isSiderActive,
    handleToggleSider,
  };
};
