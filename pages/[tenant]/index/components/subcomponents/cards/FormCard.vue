<script lang="ts" setup>
// #region vendor
import {
  Button,
  Card,
  Flex,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Textarea,
  TypographyText,
  Switch,
} from '@workai/ui/components';
import { ref } from 'vue';
import {
  EFontWeight,
  EFormLayout,
  ETypographyVariant,
  type ISelectProps,
} from '@workai/ui/types';
// #endregion
// #region internal
// #endregion
const value = ref<string | undefined>(undefined);
const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
};

const closeSelect = () => {
  open.value = false;
};

const onSubmit = async () => {};

const options = ref<ISelectProps['options']>([
  {
    value: 'Białystok',
  },
  {
    value: 'Warszawa',
  },
]);
</script>

<template>
  <Card>
    <Form :layout="EFormLayout.Vertical" :gap="24">
      <TypographyText
        :variant="ETypographyVariant.Headline3"
        :font-weight="EFontWeight.Semibold"
        content="Form"
      />
      <Flex :gap="16" vertical>
        <FormItem label="Imię">
          <Input placeholder="Wpisz..." />
        </FormItem>
        <FormItem label="Nazwisko">
          <Input placeholder="Wpisz..." />
        </FormItem>
        <FormItem label="Nazwisko">
          <Input placeholder="Wpisz..." />
        </FormItem>
        <FormItem label="Opis">
          <Textarea bordered placeholder="Wpisz..." />
        </FormItem>
        <Flex :gap="12" :vertical="isMdResolution">
          <Flex :flex="1">
            <FormItem
              label="Miasto"
              class="w-full"
              :rules="[{ required: true }]"
            >
              <Select
                v-model:value="value"
                :options="options"
                :open="open"
                @click="toggleOpen"
                @change="closeSelect"
                bordered
                labelInValue
                showArrow
                placeholder="Wybierz"
                :fieldNames="{ value: 'value', label: 'label' }"
                dropdownMatchSelectWidth
                :get-popup-container="getPopupContainer"
              />
            </FormItem>
          </Flex>
          <Flex :flex="1">
            <FormItem
              label="Kod pocztowy"
              class="w-full"
              :rules="[{ required: true }]"
            >
              <Input placeholder="Wpisz..." />
            </FormItem>
          </Flex>
        </Flex>
        <FormItem label="Regulamin">
          <Flex vertical>
            <Space :size="12">
              <Switch />
              <TypographyText content="Tak" />
            </Space>
            <TypographyText
              :variant="ETypographyVariant.Caption1"
              content='Zaznacz "tak" jeśli akceptujesz regulamin'
            />
          </Flex>
        </FormItem>
        <div class="flex justify-end">
          <FormItem>
            <Button type="primary" @click.prevent="onSubmit">Wyślij</Button>
          </FormItem>
        </div>
      </Flex>
    </Form>
  </Card>
</template>
