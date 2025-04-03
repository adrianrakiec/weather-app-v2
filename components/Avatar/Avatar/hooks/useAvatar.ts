// #region vendor
// #endregion
// #region internal
import type { TAvatarProps } from '../types';
// #endregion

export const useAvatar = (props: TAvatarProps) => {
  const userInitials = computed(() => {
    const firstname = props?.firstname?.trim();
    const surname = props?.surname?.trim();

    if (firstname && surname) {
      return `${firstname[0]}${surname[0]}`;
    }

    const name = props?.name;

    if (!name) {
      return '';
    }

    const splittedName = name
      .trim()
      .split(' ')
      ?.filter((text: string) => !!text);

    if (splittedName.length > 1) {
      return `${splittedName[0][0]}${splittedName[1][0]}`;
    } else if (splittedName[0].length > 1) {
      return `${splittedName[0][0]}${splittedName[0][1]}`;
    } else {
      return `${splittedName[0][0]}`;
    }
  });

  const getImage = (id: string) =>
    getUserProfilePath().directoryObjectImage(id);

  return {
    userInitials,
    getImage,
  };
};
