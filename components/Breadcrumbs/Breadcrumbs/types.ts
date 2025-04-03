// #region vendor
import type { RouteLocation } from 'vue-router';
// #endregion
// #region internal
import type { TNullable } from '@types';
// #endregion

export type TBreadcrumbsProps = {
  lastBreadcrumb?: TNullable<string>;
  replacer?: Record<string, any>;
  icon?: string;
};

export type TBreadcrumbProps = RouteLocation & {
  href: string;
  title: string;
  isCurrent: boolean;
};
