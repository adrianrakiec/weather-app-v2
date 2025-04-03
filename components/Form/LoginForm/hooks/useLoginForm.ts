// #region vendor
import { computed } from 'vue';
import { notification, useForm } from '@workai/ui/utils';
import { type TRule } from '@workai/ui/types';
// #endregion
// #region internal
import { LOGIN_FORM_VALIDATOR, defaultLoginFormState } from '../consts';
// #endregion

export const useLoginForm = () => {
  const { t } = useI18n();
  const router = useRouter();
  const { $authStore } = useNuxtApp();

  const rules = computed<Record<string, TRule[]>>(() => ({
    organization: [
      {
        type: 'string',
        required: true,
        message: t('shared.validation.required', {
          path: t('component.form.loginForm.field.organization.label'),
        }),
      },
      {
        max: LOGIN_FORM_VALIDATOR.maxOrganizationFieldLength,
        message: t('shared.validation.string.max', {
          max: LOGIN_FORM_VALIDATOR.maxOrganizationFieldLength,
        }),
      },
    ],
  }));

  const state = ref(defaultLoginFormState);

  const {
    validate: _validate,
    validateInfos,
    clearValidate,
  } = useForm(state, rules);

  const handleSubmitOrganization = async () => {
    try {
      const { authHandler } = useAuth();

      $authStore.setTenantName(state.value.organization);
      authHandler.updateOIDCSettings();

      await _validate();

      router.push(getPagePath().tenant.index);
    } catch (error) {
      console.error(error);

      notification.danger({
        title: t('shared.error.general.title'),
        description: t('shared.error.general.description'),
        noExtra: true,
      });
    }
  };

  const handleOnMounted = () =>
    nextTick(() => {
      clearValidate();
    });

  return {
    state,
    validateInfos,
    handleSubmitOrganization,
    handleOnMounted,
  };
};
