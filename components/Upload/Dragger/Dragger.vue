<script setup lang="ts">
// #region vendor
import {
  Button,
  Card,
  FeaturedIcon,
  Flex,
  Icon,
  TypographyText,
  UploadDragger,
} from '@workai/ui/components';
import {
  EButtonType,
  EFeaturedIconType,
  EFlexAlign,
  EFlexJustify,
  EFontWeight,
  ETypographyVariant,
} from '@workai/ui/types';
// #endregion
// #region internal
import { EContentType, EFormStatus, EFileStatus } from '@types';
import {
  type TUploadDraggerProps,
  type TUploadDraggerEmits,
  EFileSizeValidator,
} from './types';
import { useDragger } from './hooks/useDragger';
import { getFileType } from '@components/Upload/utils';
// #endregion

const props = withDefaults(defineProps<TUploadDraggerProps>(), {
  value: undefined,
  status: EFormStatus.Done,
  type: EContentType.Image,
  accept: 'image/*',
  validation: () => ({
    maxFileSize: EFileSizeValidator.genericMaxSizeInMB,
    maxImageWidth: EFileSizeValidator.imageMaxPixelsWidth,
    maxImageHeight: EFileSizeValidator.imageMaxPixelsHeight,
    acceptedExtensions: ['*/*'],
  }),
});
const emits = defineEmits<TUploadDraggerEmits>();

const {
  fileListWrapper,
  requestPath,
  headers,
  beforeUpload,
  onChange,
  onRemove,
} = await useDragger(props, emits);
</script>

<template>
  <UploadDragger
    v-model:file-list="fileListWrapper"
    :action="requestPath"
    :headers="headers"
    :before-upload="beforeUpload"
    @change="onChange"
    @remove="onRemove"
  >
    <template #itemRender="{ file, actions }">
      <Card class="[&_.ant-card-body]:p-[12px]">
        <Flex :gap="8" :justify="EFlexJustify.SpaceBetween">
          <Flex :gap="12" :align="EFlexAlign.Center">
            <Flex
              :flex="1"
              class="w-[40px] h-[40px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px]"
            >
              <ImageProtectedImage
                v-if="
                  fileListWrapper?.[0].response?.filePath &&
                  getFileType(file.type) === 'image'
                "
                class="w-[40px] h-[40px] rounded-[8px]"
                :src="fileListWrapper?.[0].response?.filePath"
              />
              <FeaturedIcon
                v-else
                :is-rounded="true"
                :type="
                  file.status === EFileStatus.Error
                    ? EFeaturedIconType.Error
                    : EFeaturedIconType.Brand
                "
              >
                <Icon name="attach" />
              </FeaturedIcon>
            </Flex>
            <TypographyText
              :variant="ETypographyVariant.Text2"
              :content="file.name"
              :font-weight="EFontWeight.Semibold"
            />
          </Flex>
          <Button
            :type="EButtonType.Text"
            :danger="file.status === EFileStatus.Error"
            @click="actions.remove"
          >
            <template #icon>
              <Icon name="delete" />
            </template>
          </Button>
        </Flex>
      </Card>
    </template>
    <slot />
  </UploadDragger>
</template>
