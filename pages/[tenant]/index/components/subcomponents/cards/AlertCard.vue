<script lang="ts" setup>
// #region vendor
import {
  Card,
  Alert,
  FeaturedIcon,
  Icon,
  Button,
  Flex,
  TypographyText,
} from '@workai/ui/components';
// #endregion
// #region internal
import {
  EAlertType,
  EButtonType,
  EFlexAlign,
  EFontWeight,
  ETypographyVariant,
} from '@workai/ui/types';
// #endregion
</script>

<template>
  <Card>
    <Flex vertical :gap="24">
      <TypographyText
        :variant="ETypographyVariant.Headline3"
        :font-weight="EFontWeight.Semibold"
        content="Alert"
      />
      <Alert>
        <template #icon>
          <FeaturedIcon>
            <Icon name="checkmark-circle" />
          </FeaturedIcon>
        </template>
        <template #description>
          <Flex vertical :align="EFlexAlign.Start" gap="12">
            <TypographyText content="Pomyślnie przesłany plik" />
            <Button>Zamknij</Button>
          </Flex>
        </template>
      </Alert>
      <Alert :type="EAlertType.Success">
        <template #icon>
          <FeaturedIcon>
            <Icon name="checkmark-circle" />
          </FeaturedIcon>
        </template>
        <template #description>
          <Flex vertical :align="EFlexAlign.Start" gap="12">
            <TypographyText content="Pomyślnie przesłany plik" />
            <Button :type="EButtonType.Primary">Zamknij</Button>
          </Flex>
        </template>
      </Alert>
      <Alert :type="EAlertType.Error">
        <template #icon>
          <FeaturedIcon>
            <Icon name="checkmark-circle" />
          </FeaturedIcon>
        </template>
        <template #description>
          <Flex vertical :align="EFlexAlign.Start" gap="12">
            <TypographyText content="Wystąpił problem z tą czynnością" />
            <Button :type="EButtonType.Primary">Zamknij</Button>
          </Flex>
        </template>
      </Alert>
      <Alert :type="EAlertType.Warning">
        <template #icon>
          <FeaturedIcon>
            <Icon name="checkmark-circle" />
          </FeaturedIcon>
        </template>
        <template #description>
          <Flex vertical :align="EFlexAlign.Start" gap="12">
            <TypographyText content="Wystąpił problem z tą czynnością" />
            <Button>Zamknij</Button>
          </Flex>
        </template>
      </Alert>
    </Flex>
  </Card>
</template>
