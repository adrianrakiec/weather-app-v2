<script setup lang="ts">
// #region vendor
import {
  TypographyLink,
  TypographyText,
  TypographyTitle,
  TypographyParagraph,
  Space,
  Flex,
  Card,
} from '@workai/ui/components';
import { ETypographyVariant, EFontWeight } from '@workai/ui/types';
// #endregion
// #region internal
// #endregion
</script>

<template>
  <Card>
    <Flex vertical :gap="24">
      <TypographyText
        :variant="ETypographyVariant.Headline3"
        :font-weight="EFontWeight.Semibold"
        content="Typography"
      />
      <Space direction="vertical" size="large">
        <TypographyTitle content="Headline 1" />
        <TypographyTitle
          :variant="ETypographyVariant.Headline2"
          content="Headline 2"
        />
        <TypographyTitle
          :variant="ETypographyVariant.Headline3"
          content="Headline 3"
        />
        <TypographyTitle
          :variant="ETypographyVariant.Headline4"
          content="Headline 4"
        />
        <TypographyTitle
          :variant="ETypographyVariant.Headline5"
          content="Headline 5"
        />
        <TypographyTitle
          :variant="ETypographyVariant.Paragraph1"
          content="Paragraph 1"
        />
        <TypographyTitle
          :variant="ETypographyVariant.Paragraph2"
          content="Paragraph 2"
        />
        <TypographyTitle :variant="ETypographyVariant.Text1" content="Text 1" />
        <TypographyTitle :variant="ETypographyVariant.Text2" content="Text 1" />
        <TypographyTitle
          :variant="ETypographyVariant.Caption1"
          content="Caption 1"
        />
        <TypographyTitle
          :variant="ETypographyVariant.Caption2"
          content="Caption 2"
        />
        <TypographyLink href="https://workai.com" content="Link" />
        <Space>
          <TypographyParagraph content="Paragraph" />
          <TypographyParagraph
            :font-weight="EFontWeight.Regular"
            content="Regular"
          />
          <TypographyParagraph
            :font-weight="EFontWeight.Semibold"
            content="Semibold"
          />
        </Space>
        <Space>
          <TypographyText
            :variant="ETypographyVariant.Text1"
            content="Text 1"
          />
          <TypographyText
            :variant="ETypographyVariant.Text2"
            content="Text 2"
          />
        </Space>
      </Space>
    </Flex>
  </Card>
</template>
