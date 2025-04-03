// #region vendor
import type { User, UserProfile } from 'oidc-client-ts';
// #endregion
// #region internal
// #endregion

// #region Enums
// #endregion

// #region Types
export type TElasticOrganization = {
  childOrganizationIds: Array<string>;
  domainId: string;
  hasPartner: boolean;
  id: number;
  isAdmin: boolean;
  isPartner: boolean;
  name: string;
};

export type TWorkaiUser = {
  profile: {
    elastic_organizations: string; // JSON'ed Array of available organizations for user
    elastic_domainid: string; // Id of current domain
    elastic_service: boolean; // indicates if user is in Service Mode
    idp: string; // identity provider ex. B2C or AAD
  } & UserProfile;
} & User;
// #endregion

// #region Interfaces
// #endregion
