// #region vendor
import { useBreakpoints } from '@vueuse/core';
// #endregion
// #region internal
// #endregion

export const breakpoints = useBreakpoints({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  max: 9999,
});

export const activeBreakpoint = breakpoints.active();
export const isXsResolution = breakpoints.smaller('sm');
export const isSmResolution = breakpoints.smaller('md');
export const isMdResolution = breakpoints.smaller('lg');
export const isLgResolution = breakpoints.smaller('xl');
export const isXlResolution = breakpoints.smaller('xxl');
export const isXxlResolution = breakpoints.smaller('max');
