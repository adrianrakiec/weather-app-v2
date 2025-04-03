// #region vendor
import { h } from 'vue';
import {
  type TVueNode,
  EFlexAlign,
  ETypographyVariant,
  EFontWeight,
  EButtonType,
  EFeaturedIconType,
} from '@workai/ui/types';
import {
  Flex,
  FeaturedIcon,
  Icon,
  TypographyText,
} from '@workai/ui/components';
// #endregion
// #region internal
import { EModalWidth } from '@config/consts/sizes';
import { getFileExtension } from '@components/Upload/utils';
// #endregion

export const getModalInvalidImageSize = (
  maxImageWidth: number,
  maxImageHeight: number
) => {
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;

  return {
    class: '[&_.ant-btn-default]:hidden',
    icon: null,
    width: EModalWidth.Default,
    mask: true,
    maskClosable: true,
    centered: true,
    cancelText: null,
    cancelButtonProps: null,
    okText: t('neutral.close'),
    okButtonProps: {
      type: EButtonType.Primary,
      danger: true,
    },
    title: () =>
      h(Flex, { gap: 16, align: EFlexAlign.Start }, () => [
        h(
          FeaturedIcon,
          { isRounded: true, type: EFeaturedIconType.Error },
          () => [h(Icon, { name: 'error-circle' })]
        ),
        h(Flex, { vertical: true, gap: 4 }, () => [
          h(TypographyText, {
            variant: ETypographyVariant.Headline5,
            content: t('neutral.error.upload'),
            fontWeight: EFontWeight.Semibold,
          }),
          h(TypographyText, {
            variant: ETypographyVariant.Text2,
            fontWeight: EFontWeight.Regular,
            content: t('shared.validation.image.resolution', {
              width: maxImageWidth,
              height: maxImageHeight,
            }),
          }),
        ]),
      ]) as TVueNode,
  };
};

export const getModalInvalidSize = (
  fileName: string,
  fileSizeInMB: number,
  maxFileSize: number
) => {
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;

  return {
    class: '[&_.ant-btn-default]:hidden',
    icon: null,
    width: EModalWidth.Default,
    mask: true,
    maskClosable: true,
    centered: true,
    cancelButtonProps: null,
    okText: t('neutral.close'),
    okButtonProps: {
      type: EButtonType.Primary,
      danger: true,
    },
    title: () =>
      h(Flex, { gap: 16, align: EFlexAlign.Start }, () => [
        h(
          FeaturedIcon,
          { isRounded: true, type: EFeaturedIconType.Error },
          () => [h(Icon, { name: 'error-circle' })]
        ),
        h(Flex, { vertical: true, gap: 4 }, () => [
          h(TypographyText, {
            variant: ETypographyVariant.Headline5,
            content: t('neutral.error.upload'),
            fontWeight: EFontWeight.Semibold,
          }),
          h(TypographyText, {
            variant: ETypographyVariant.Text2,
            fontWeight: EFontWeight.Regular,
            content: t('shared.validation.file.size', {
              name: fileName,
              size: fileSizeInMB,
              limit: maxFileSize,
            }),
          }),
        ]),
      ]) as TVueNode,
  };
};

export const getModalInvalidExtension = (
  fileName: string,
  acceptedExtensions: string[]
) => {
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;

  return {
    class: '[&_.ant-btn-default]:hidden',
    icon: null,
    width: EModalWidth.Default,
    mask: true,
    maskClosable: true,
    centered: true,
    okText: t('neutral.close'),
    cancelButtonProps: null,
    okButtonProps: {
      type: EButtonType.Primary,
      danger: true,
    },
    title: () =>
      h(Flex, { gap: 16, align: EFlexAlign.Start }, () => [
        h(
          FeaturedIcon,
          { isRounded: true, type: EFeaturedIconType.Error },
          () => [h(Icon, { name: 'error-circle' })]
        ),
        h(Flex, { vertical: true, gap: 4 }, () => [
          h(TypographyText, {
            variant: ETypographyVariant.Headline5,
            content: t('neutral.error.upload'),
            fontWeight: EFontWeight.Semibold,
          }),
          h(TypographyText, {
            variant: ETypographyVariant.Text2,
            fontWeight: EFontWeight.Regular,
            content: t('shared.validation.file.format', {
              name: fileName,
              type: acceptedExtensions
                .map((extension) => getFileExtension(extension))
                .join(', '),
            }),
          }),
        ]),
      ]) as TVueNode,
  };
};
