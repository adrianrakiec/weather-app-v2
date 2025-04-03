// #region vendor
// #endregion
// #region internal
import type { TBreadcrumbsProps, TBreadcrumbProps } from '../types';
// #endregion

export const useBreadcrumbs = (props: TBreadcrumbsProps) => {
  const { t } = useI18n();

  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();

  const breadcrumbs = computed<TBreadcrumbProps[]>(() => {
    const routes = route.matched[0].path.substring(1).split('/');

    let fullPath = '';
    const routesList = routes
      .map((r) => {
        if (r) {
          fullPath = `${fullPath.replace(
            ':tenant()',
            authStore.tenantName
          )}/${r.replace(':tenant()', authStore.tenantName)}`;

          try {
            const el = router.resolve(fullPath);

            if (!el.name || el.meta.hideInBreadcrumbs) {
              return null;
            }

            const name = t(`shared.breadcrumbs.page.${el.name as string}`);

            const pathWithTenantName = el.fullPath.replace(
              ':tenant()',
              authStore.tenantName
            );
            const isCurrent = pathWithTenantName === route.fullPath;

            if (props.replacer && name in props.replacer) {
              return { ...el, title: props.replacer[name], isCurrent };
            } else if (name.includes('shared.breadcrumb.page.')) {
              return null;
            }

            return { ...el, title: name, isCurrent };
          } catch (error) {
            console.error(error);
          }

          return null;
        }

        return null;
      })
      .filter((el) => {
        return el !== null && el.name;
      }) as TBreadcrumbProps[];

    return props.lastBreadcrumb ? routesList.slice(0, -1) : routesList;
  });

  const handleBreadcrumbClick = (path: string) => {
    router.push(path);
  };

  const lastBreadcrumbAdapter = computed(() => {
    if (props.lastBreadcrumb && props.lastBreadcrumb.length > 25) {
      return props.lastBreadcrumb.slice(0, 25) + '...';
    }

    return props.lastBreadcrumb;
  });

  return { breadcrumbs, lastBreadcrumbAdapter, handleBreadcrumbClick };
};
