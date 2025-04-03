<script setup lang="ts">
// #region vendor
import { Avatar, Icon } from '@workai/ui/components';
// #endregion
// #region internal
import type { TAvatarProps } from './types';
import { useAvatar } from './hooks/useAvatar';
// #endregion

const props = withDefaults(defineProps<TAvatarProps>(), {
  id: undefined,
  firstname: '',
  surname: '',
  name: '',
});

const { userInitials, getImage } = useAvatar(props);
</script>

<template>
  <Avatar :src="id ? getImage(id) : undefined">
    <template #default>
      <Icon v-if="!userInitials" name="person" />
      {{ userInitials }}
    </template>
  </Avatar>
</template>
