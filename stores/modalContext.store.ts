// #region vendor
import { acceptHMRUpdate, defineStore } from 'pinia';
// #endregion
// #region internal
// #endregion

export const useModalStore = defineStore('ModalStore', () => {
  const globalModal = ref();

  const setGlobalModal = (_modal: unknown) => (globalModal.value = _modal);

  return { globalModal, setGlobalModal };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
}
