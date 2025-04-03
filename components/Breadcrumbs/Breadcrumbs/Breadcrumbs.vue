<script lang="ts" setup>
// #region vendor
import { Breadcrumb, Icon, BreadcrumbItem } from '@workai/ui/components';
// #endregion
// #region internal
import type { TBreadcrumbsProps } from './types';
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
// #endregion

const props = withDefaults(defineProps<TBreadcrumbsProps>(), {
  icon: 'home',
});

const { breadcrumbs, lastBreadcrumbAdapter, handleBreadcrumbClick } =
  useBreadcrumbs(props);
</script>

<template>
  <Breadcrumb v-if="breadcrumbs.length || lastBreadcrumbAdapter">
    <BreadcrumbItem
      v-for="(item, index) in breadcrumbs"
      :key="item.name?.toString()"
      :href="item.isCurrent ? undefined : item.fullPath"
      @click.prevent="() => handleBreadcrumbClick(item.path)"
    >
      <Icon :width="20" v-if="index === 0" :name="icon" />
      {{ item.title }}
    </BreadcrumbItem>
    <BreadcrumbItem v-if="lastBreadcrumbAdapter">
      {{ lastBreadcrumbAdapter }}
    </BreadcrumbItem>
  </Breadcrumb>
</template>
