// #region vendor
// #endregion
// #region internal
import type { TLoginFormState } from './types';
// #endregion

export const LOGIN_FORM_VALIDATOR = {
  maxOrganizationFieldLength: 30,
} as const;

export const defaultLoginFormState: TLoginFormState = {
  organization: '',
};
