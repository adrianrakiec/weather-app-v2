<script setup lang="ts">
// #region vendor
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Divider,
  Flex,
  Icon,
  PageHeader,
  Space,
  TypographyParagraph,
  TypographyText,
  Tabs,
  TabPane,
} from '@workai/ui/components';
import {
  EFontWeight,
  EFlexWrap,
  ETypographyVariant,
  ETypographyColor,
} from '@workai/ui/types';
import { TABS_MOCK } from './consts';
// #endregion
// #region internal
// #endregion

const activeKey = ref(TABS_MOCK[0].id);
</script>

<template>
  <Card>
    <Flex vertical :gap="24">
      <TypographyText
        :variant="ETypographyVariant.Headline3"
        :font-weight="EFontWeight.Semibold"
        content="Page Header"
      />
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbItem href="#">
            <Icon name="home" />
            Strona główna
          </BreadcrumbItem>
          <BreadcrumbItem>Administracja</BreadcrumbItem>
        </Breadcrumb>
        <template #extra>
          <Flex
            :gap="12"
            :wrap="isMdResolution ? EFlexWrap.Wrap : EFlexWrap.NoWrap"
          >
            <Button>Odrzuć</Button>
            <Button type="primary">
              <template #icon>
                <Icon name="save" />
              </template>
              Zapisz zmiany
            </Button>
          </Flex>
        </template>
      </PageHeader>
      <Tabs
        v-model:activeKey="activeKey"
        :class="isSmResolution && `[&_.ant-tabs-nav-wrap]:max-w-[250px]`"
      >
        <TabPane v-for="tab in TABS_MOCK" :key="tab.id">
          <template #tab> <Icon :name="tab.icon" />{{ tab.name }} </template>
          <Flex
            v-for="(item, index) in tab.content"
            :key="index"
            style="padding-top: 20px"
            vertical
            :gap="16"
          >
            <Flex :gap="12" class="mb-4">
              <Avatar :src="item.img" />
              <Flex vertical :gap="4">
                <TypographyParagraph>
                  <TypographyText
                    :content="item.name"
                    strong
                    :color="ETypographyColor.Headline"
                  />
                </TypographyParagraph>
                <TypographyParagraph>
                  <TypographyText :content="item.descriptiom" />
                </TypographyParagraph>
              </Flex>
            </Flex>
            <Divider v-if="index < tab.content.length - 1" />
          </Flex>
        </TabPane>
      </Tabs>
    </Flex>
  </Card>
</template>
