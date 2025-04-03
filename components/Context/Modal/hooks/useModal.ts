// #region vendor
import { Modal } from '@workai/ui/utils';
// #endregion
// #region internal
// #endregion

export const useModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const { setGlobalModal } = useModalStore();

  setGlobalModal(modal);

  return {
    contextHolder,
  };
};
