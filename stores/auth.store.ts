// #region vendor
import { acceptHMRUpdate, defineStore } from 'pinia';
import { User } from 'oidc-client-ts';
// #endregion
// #region internal
// #endregion

export const useAuthStore = defineStore('AuthStore', () => {
  const authUser = ref<User | null>(null);
  const tenantName = ref<string>('');

  const userId = computed(() => authUser.value?.profile.sub ?? '');

  const accessToken = computed(() => authUser.value?.access_token ?? '');

  const isLoggedIn = computed(() => !!authUser.value);

  const setUpUserCredentials = (user: User | null) => {
    if (!user) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', user.access_token);
    }

    authUser.value = user;
  };

  const setTenantName = (name: string) => {
    tenantName.value = name;
  };

  const clearUserSession = () => {
    localStorage.removeItem('token');

    authUser.value = null;
  };

  return {
    tenantName,
    accessToken,
    isLoggedIn,
    setUpUserCredentials,
    setTenantName,
    clearUserSession,
    userId,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
