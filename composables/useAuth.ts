// #region vendor
import { jwtDecode } from 'jwt-decode';
import {
  User,
  UserManager,
  type UserManagerSettings,
  WebStorageStateStore,
} from 'oidc-client-ts';
// #endregion
// #region internal
import type { TWorkaiUser, IElasticJwtPayload } from '@types';
// #endregion

class AuthHandler {
  private static instance: AuthHandler;
  private userManager!: UserManager;

  constructor() {
    this.initializeOIDC();
  }

  public static getInstance(): AuthHandler {
    if (!AuthHandler.instance) {
      AuthHandler.instance = new AuthHandler();
    }

    return AuthHandler.instance;
  }

  public updateOIDCSettings() {
    const { public: publicConfig } = useRuntimeConfig();
    const authStore = useAuthStore();

    const urlTenantName = getTenantNameFromPath();
    const tenantName = authStore.tenantName || urlTenantName;
    const authPath = tenantName ? `/${tenantName}` : '';
    const parameters = {
      acr_values: `elastic_organizationurlname:${tenantName !== publicConfig.SINGLE_TENANT_SUFFIX ? tenantName : publicConfig.BASE_TENANT_NAME}`,
    };

    const settings: UserManagerSettings = {
      authority: publicConfig.IDENTITY_AUTHORITY_URL as string,
      client_id: publicConfig.IDENTITY_CLIENT_ID as string,
      redirect_uri: `${window.location.origin}${authPath}/auth`,
      silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }${authPath}/auth/silent-renew`,
      post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }${authPath}/auth/signed-out`,
      response_type: 'code',
      response_mode: 'query',
      scope: publicConfig.IDENTITY_CLIENT_SCOPE as string,
      userStore: new WebStorageStateStore(),
      loadUserInfo: true,
      accessTokenExpiringNotificationTimeInSeconds: 3600,
      automaticSilentRenew: true,
      filterProtocolClaims: true,
      client_secret: publicConfig.IDENTITY_CLIENT_SECRET,
      ...{ ...parameters },
    };

    this.userManager = new UserManager(settings);

    this.userManager.events.addAccessTokenExpiring(async () => {
      console.log("Token will expire, refreshing...");
      try {
        await this.userManager.signinSilent();
        console.log("Token refreshed!");
      } catch (error) {
        console.error("Token refresh error:", error);
      }
    });
  }

  private initializeOIDC() {
    try {
      this.updateOIDCSettings();
    } catch (error) {
      console.error('Failed to initialize OIDC:', error);
    }
  }

  public async signInRedirect(requestedUrl = '') {
    localStorage.setItem('oidc_requested_url', requestedUrl);
    return this.userManager.signinRedirect();
  }

  public signInCallback(url: string | undefined) {
    return this.userManager.signinCallback();
  }

  public renewToken(): Promise<User | null> {
    console.log('Token is about to expire, refreshing...');
    return this.userManager.signinSilent();
  }

  public clearStaleState(): Promise<void> {
    return this.userManager.clearStaleState();
  }

  public signoutRedirect(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async logout(): Promise<void> {
    try {
      console.log('Initiating sign-out...');
      await this.userManager.clearStaleState();
      console.log('Stale state cleared.');

      console.log('Initiating sign-out redirect...');
      await this.userManager.signoutRedirect();

      console.log('Sign-out initiated successfully.');
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }

  public async getUser(): Promise<TWorkaiUser | null> {
    if (!this.userManager) {
      return null;
    }

    return (await this.userManager.getUser()) as TWorkaiUser;
  }

  public getTenantSettings = async () => {
    const user = (await this.userManager.getUser()) as TWorkaiUser;

    const token = user?.access_token;

    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode<IElasticJwtPayload>(token);

    const settings = {
      organizationId: +decodedToken.elastic_intranetorganizationid,
    };

    return settings;
  };
}

export const useAuth = () => {
  return {
    authHandler: AuthHandler.getInstance(),
  };
};
