<script setup lang="ts">
// #region vendor
import { Form, FormItem, Input, Button, Icon } from '@workai/ui/components';
import { EButtonHtmlType, EButtonType, EFormLayout } from '@workai/ui/types';
// #endregion
// #region internal
import { LOGIN_FORM_VALIDATOR } from './consts';
import { useLoginForm } from './hooks/useLoginForm';
// #endregion

const { state, validateInfos, handleSubmitOrganization, handleOnMounted } =
  useLoginForm();

onMounted(handleOnMounted);
</script>

<template>
  <Form class="w-full" :layout="EFormLayout.Vertical">
    <FormItem
      v-bind="validateInfos.organization"
      :label="$t('component.form.loginForm.field.organization.label')"
    >
      <Input
        v-model:value="state.organization"
        :placeholder="
          $t('component.form.loginForm.field.organization.placeholder')
        "
        :maxlength="LOGIN_FORM_VALIDATOR.maxOrganizationFieldLength"
        show-count
        bordered
      >
        <template #prefix>
          <Icon name="organization" />
        </template>
      </Input>
    </FormItem>
    <FormItem>
      <Button
        :disabled="!state.organization"
        :html-type="EButtonHtmlType.Submit"
        :type="EButtonType.Primary"
        block
        @click="handleSubmitOrganization"
      >
        {{ $t('component.form.loginForm.submit.title') }}
      </Button>
    </FormItem>
  </Form>
</template>
