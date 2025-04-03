import { defineStore } from 'pinia';
import { ref } from 'vue';
import { EAlertType } from '@workai/ui/types';

export const useAlertStore = defineStore('alert', () => {
  const message = ref<string | null>(null);
  const type = ref<EAlertType>(EAlertType.Warning);

  const clearMessage = () => {
    message.value = null;
    type.value = EAlertType.Warning;
  };

  const clearAfterTimeout = (timeout: number) => {
    setTimeout(clearMessage, timeout);
  };

  const showSuccess = (msg: string, timeout = 2500) => {
    message.value = msg;
    type.value = EAlertType.Success;
    clearAfterTimeout(timeout);
  };

  const showError = (msg: string, timeout = 2500) => {
    message.value = msg;
    type.value = EAlertType.Error;
    clearAfterTimeout(timeout);
  };

  const handleError = (error: unknown, timeout = 2500) => {
    let errorMessage = 'Unexpected error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    showError(errorMessage, timeout);
  };

  return { message, type, clearMessage, showSuccess, handleError };
});
