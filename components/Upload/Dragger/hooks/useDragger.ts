// #region vendor
import { v4 as uuidv4 } from 'uuid';
import {
  type TUploadFile,
  type IUploadProps,
  type THttpRequestHeader,
} from '@workai/ui/types';

import { UploadListIgnore } from '@workai/ui/utils';
// #endregion
// #region internal
import { EFileType, EContentType, EFormStatus } from '@types';
import { type TUploadDraggerProps, type TUploadDraggerEmits } from '../types';
import {
  getModalInvalidImageSize,
  getModalInvalidSize,
  getModalInvalidExtension,
} from '../utils';
import { DEFAULT_VALIDATION } from '../consts';
import { getFileExtensionFromName } from '../../utils';
// #endregion

export const useDragger = async (
  props: TUploadDraggerProps,
  emits: TUploadDraggerEmits
) => {
  const { authHandler } = useAuth();
  const { tenantSettings } = useAppStore();
  const { globalModal } = useModalStore();

  const statusModel = useVModel(props, 'status', emits, { passive: true });
  const valueModel = useVModel(props, 'value', emits, { passive: true });
  const fileList = ref<TUploadFile[]>([]);

  const user = await authHandler.getUser();

  const fileTypeAdapter = computed(() => {
    switch (props.type) {
      case EContentType.Image:
        return EFileType.Image;
      case EContentType.Video:
        return EFileType.Video;
      default:
        return EFileType.Generic;
    }
  });

  const headers = computed(() => {
    const uniqueFileUploadId = uuidv4();

    return {
      Authorization: user?.access_token ? `Bearer ${user.access_token}` : '',
      Path: `/${tenantSettings?.organizationId}/Files/${uniqueFileUploadId}`,
      Type: fileTypeAdapter.value,
    } as unknown as THttpRequestHeader;
  });

  const requestPath = computed(() => {
    if (tenantSettings) {
      return getFilePath().files(tenantSettings?.organizationId);
    }
  });

  const fileListWrapper = computed({
    get: (): TUploadFile[] => {
      if (!fileList.value.length) {
        return valueModel.value
          ? [
              {
                uid: '-1',
                name: valueModel.value.split('/')?.[
                  valueModel.value.length - 1
                ],
                status: 'done',
                url: valueModel.value,
              },
            ]
          : [];
      }
      return fileList.value;
    },
    set: (value: TUploadFile[]) => {
      if (value.length === 1 && value[0].status === EFormStatus.Error) {
        useCustomErrorMessage(value[0].response);
      }

      fileList.value = [value[value.length - 1]];
    },
  });

  const beforeUpload: IUploadProps['beforeUpload'] = async (file) => {
    // 1024 is amount of bytes in 1KB
    const fileSizeInMB = Number((file.size / 1024 / 1024).toFixed(2));
    const fileUrl = URL.createObjectURL(file);

    const maxImageWidth =
      props.validation?.maxImageWidth ?? DEFAULT_VALIDATION.maxImageWidth;
    const maxImageHeight =
      props.validation?.maxImageHeight ?? DEFAULT_VALIDATION.maxImageHeight;
    const maxFileSize =
      props.validation?.maxFileSize ?? DEFAULT_VALIDATION.maxFileSize;
    const acceptedExtensions =
      props.validation?.acceptedExtensions ??
      DEFAULT_VALIDATION.acceptedExtensions;

    // Image size validation
    if (
      props.type === EContentType.Image &&
      file.type.split('/')?.[0] === 'image'
    ) {
      const imageHtmlElement = new Image();
      const loadImagePromiseResult = await new Promise<boolean>((resolve) => {
        imageHtmlElement.src = fileUrl;
        imageHtmlElement.onload = () => {
          if (
            imageHtmlElement.width > maxImageWidth ||
            imageHtmlElement.height > maxImageHeight
          ) {
            globalModal?.confirm(
              getModalInvalidImageSize(maxImageWidth, maxImageHeight)
            );

            resolve(false);
          } else {
            resolve(true);
          }
        };
      });

      if (!loadImagePromiseResult) {
        return UploadListIgnore;
      }
    }

    // File size validation
    if (props.validation && fileSizeInMB > maxFileSize) {
      globalModal?.confirm(
        getModalInvalidSize(file.name, fileSizeInMB, maxFileSize)
      );

      return UploadListIgnore;
    }

    // File extension validation
    if (
      (!acceptedExtensions.includes(DEFAULT_VALIDATION.acceptedExtensions[0]) &&
        !acceptedExtensions.includes(file.type)) ||
      !acceptedExtensions.includes(
        getFileExtensionFromName(file.name, file.type)
      )
    ) {
      globalModal?.confirm(
        getModalInvalidExtension(file.name, acceptedExtensions)
      );

      return UploadListIgnore;
    }

    return;
  };

  const onRemove = () => {
    fileList.value = [];
    valueModel.value = '';
  };

  const handlePrepareFileList = async () => {
    if (
      requestPath.value &&
      props.value &&
      props.value.includes(requestPath.value)
    ) {
      const fileUid = props.value.split('/').reverse()[0];
      try {
        const { name, mime } = await fileService.getFileMetadataById(fileUid);

        fileList.value = [
          {
            uid: fileUid,
            thumbUrl: mime.startsWith('image') ? props.value : '',
            type: mime,
            name,
            status: 'done',
          },
        ];
      } catch (error) {
        fileList.value = [
          {
            uid: fileUid,
            thumbUrl: props.value,
            name: '',
            status: 'error',
          },
        ];
      }
    } else if (props.value) {
      const fileUrl = new URL(
        props.value.startsWith('/')
          ? window.location.origin + props.value
          : props.value
      );
      const fileName = fileUrl.pathname.substring(
        fileUrl.pathname.lastIndexOf('/') + 1
      );

      fileList.value = [
        {
          uid: '-1',
          name: fileName,
          status: 'done',
          url: props.value,
        },
      ];
    }
  };

  const onChange = (info: { file: TUploadFile }) => {
    if (info.file.status === EFormStatus.Done) {
      valueModel.value = info.file.response.filePath;
      statusModel.value = EFormStatus.Done;
    } else if (info.file.status === EFormStatus.Error) {
      statusModel.value = EFormStatus.Error;
    } else if (info.file.status === EFormStatus.Uploading) {
      statusModel.value = EFormStatus.Uploading;
    }
  };

  watch(
    () => props.value,
    (next, prev) => {
      if (next && next !== prev) {
        const file = fileList.value[0];

        if (next !== file?.response?.filePath) {
          handlePrepareFileList();
        }
      } else {
        fileList.value = [];
      }
    },
    {
      immediate: true,
    }
  );

  return {
    fileListWrapper,
    requestPath,
    headers,
    beforeUpload,
    onChange,
    onRemove,
  };
};
