// #region vendor
// #endregion
// #region internal
import { ERROR_MESSAGE } from '@config/consts/general';
// #endregion

export const getErrorMessage = (message: string) => {
  const splittedMessage = message.split('>')?.[1].trim();

  if (ERROR_MESSAGE.Abort === splittedMessage) {
    return ERROR_MESSAGE.Abort;
  }

  const errorMessage = ERROR_MESSAGE.Unknown;

  return errorMessage;
};
