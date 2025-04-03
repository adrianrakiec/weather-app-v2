export const useForceLogout = () => {
  const { authHandler } = useAuth();

  const handleForceLogout = () => authHandler.logout();

  return { handleForceLogout };
};
