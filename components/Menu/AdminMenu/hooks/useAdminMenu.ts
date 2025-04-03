import {
  EMenuClasses,
  MENU_CLASS,
  MENU_ITEM_CLASS,
} from '@components/Menu/consts';

export const useAdminMenu = () => {
  const route = useRoute();

  const selectedKey = ref(route.fullPath);

  watch(
    () => route.fullPath,
    async (next, prev) => {
      if (next === prev) {
        return;
      }

      selectedKey.value = route.fullPath;
    },
    {
      immediate: false,
    }
  );

  const scrollToActiveMenuItem = async () => {
    await nextTick();

    const container = document.querySelector(`.${MENU_CLASS}`);
    const activeElement = document.querySelector(
      `.${EMenuClasses.ActiveMenuItem}`
    );
    const menuItems = document.querySelectorAll(`.${MENU_ITEM_CLASS}`);

    if (container && activeElement) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      if (menuItems[0] === activeElement) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
        return;
      }

      if (menuItems[menuItems.length - 1] === activeElement) {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth',
        });
        return;
      }

      const offset =
        activeRect.left -
        containerRect.left -
        containerRect.width / 2 +
        activeRect.width / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };

  watch(
    () => selectedKey.value,
    () => {
      scrollToActiveMenuItem();
    }
  );

  return { scrollToActiveMenuItem, selectedKey };
};
