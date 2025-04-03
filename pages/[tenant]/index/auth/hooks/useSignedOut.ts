export const useSignedOut = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push(getPagePath().tenant.authLogin);
  };

  return { handleLogin };
};
