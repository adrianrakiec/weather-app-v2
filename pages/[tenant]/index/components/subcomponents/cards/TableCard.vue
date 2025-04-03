<script setup lang="ts">
// #region vendor
import {
  Flex,
  Button,
  TypographyText,
  Icon,
  Table,
  Empty,
  Space,
  Avatar,
} from '@workai/ui/components';
import {
  EButtonType,
  EEmptyImageTemplate,
  EFlexJustify,
  EFontWeight,
  ESpaceDirection,
  ETypographyColor,
  ETypographyVariant,
} from '@workai/ui/types';
import { isMobileResolution, renderPaginationItems } from '@workai/ui/utils';
import {
  ActionName,
  exampleColumns,
  exampleDataSource,
  handleRowSelection,
} from './consts';
// #endregion
// #region internal
// #endregion

const paginationConfig = {
  total: 50,
  pageSize: 10,
  showSizeChanger: false,
  showQuickJumper: false,
  disabled: false,
  simple: isMobileResolution.value,
  onChange: () => {},
  itemRender: renderPaginationItems,
};
</script>

<template>
  <Table
    :pagination="paginationConfig"
    :bordered="true"
    :dataSource="exampleDataSource"
    :columns="exampleColumns"
    showHeader
    :defaultExpandAllRows="false"
    :expandFixed="false"
    :indentSize="0"
    :loading="false"
    :sticky="false"
    :rowSelection="handleRowSelection"
    :scroll="{ x: 768 }"
  >
    <template #customFilterIcon>
      <Icon name="filter" />
    </template>
    <template #emptyText>
      <Flex :justify="EFlexJustify.Center">
        <Empty :template="EEmptyImageTemplate.SearchResults">
          <template #description>
            <Flex :gap="24" vertical>
              <Flex :gap="4" vertical>
                <TypographyText
                  :variant="ETypographyVariant.Headline5"
                  content="Brak wyników wyszukiwania"
                  :font-weight="EFontWeight.Semibold"
                />
              </Flex>
            </Flex>
          </template>
        </Empty>
      </Flex>
    </template>
    <template #bodyCell="{ column, value }">
      <template v-if="column.key === 'name'">
        <Space :size="12">
          <Avatar src="https://picsum.photos/200" />
          <Space :direction="ESpaceDirection.Vertical" :size="0">
            <TypographyText
              :content="value"
              :color="ETypographyColor.Headline"
            />
            <TypographyText
              content="UX/UI Designer"
              :color="ETypographyColor.Paragraph"
            />
          </Space>
        </Space>
      </template>
      <template v-else-if="column.key === ActionName.Action">
        <Button v-if="value === ActionName.Edit" :type="EButtonType.Text">
          <Icon name="delete" />
        </Button>
        <Button v-else-if="value === ActionName.Trash" :type="EButtonType.Text">
          <Icon name="edit" />
        </Button>
      </template>
    </template>
  </Table>
</template>
