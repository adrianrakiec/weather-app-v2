export const getFileType = (type: string) => {
  const fileType = type.split('/')?.[0] ?? '';

  return fileType;
};

export const getFileExtension = (type: string) => {
  const fileExtension = type.split('/')?.[1] ?? '';

  return fileExtension;
};

export const getFileExtensionFromName = (name: string, type: string) => {
  const fileExtensionFromName = name.split('.').pop() ?? '';

  if (fileExtensionFromName === 'jfif') {
    return `image/${fileExtensionFromName}`;
  }

  return type;
};
