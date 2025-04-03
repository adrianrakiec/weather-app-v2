<script lang="ts" setup>
// #region vendor
// #endregion
// #region internal
import FormCard from '../cards/FormCard.vue';
import TableCard from '../cards/TableCard.vue';
import SkeletonCard from '../cards/SkeletonCard.vue';
import AlertCard from '../cards/AlertCard.vue';
import Card from '../cards/CardCard.vue';
import PageHeaderCard from '../cards/PageHeaderCard.vue';
import ProgressCard from '../cards/ProgressCard.vue';
import AvatarCard from '../cards/AvatarCard.vue';
import TypographyCard from '../cards/TypographyCard.vue';
// #endregion
</script>

<template>
  <div
    class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start xl:gap-[16px] gap-y-[16px] w-full"
  >
    <div class="col-span-1 grid xl:gap-[16px] gap-y-[16px]">
      <FormCard />
      <Card />
      <SkeletonCard />
      <AvatarCard />
    </div>

    <div class="col-span-2 space-y-6 xl:gap-[16px] gap-y-[16px]">
      <TableCard />
      <div
        class="grid xl:grid-cols-2 grid-cols-1 xl:gap-[16px] gap-y-[16px] pt-[16px]"
      >
        <ProgressCard />
        <AlertCard />
      </div>
      <div class="grid pt-[16px] xl:gap-[16px] gap-y-[16px] xl:pb-0 pb-[16px]">
        <PageHeaderCard />
        <TypographyCard />
      </div>
    </div>
  </div>
</template>
