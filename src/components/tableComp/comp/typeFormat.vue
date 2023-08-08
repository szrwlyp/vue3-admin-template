<script setup lang="ts">
import { computed, toRefs } from "vue";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: Table.TableCloumnArrTypes;
}
const props = defineProps<Props>();
const { prop, compOptions } = toRefs<Table.TableCloumnArrTypes>(
  props.columnCompOptions
);

const typeStr = computed(() => {
  const { label } = compOptions?.value?.columnTypeArr?.find(
    (item) => item.value === props.columnRow.order_type
  ) ?? { label: "数据错误" };
  return label;
});
</script>

<template>
  <div>{{ typeStr }}</div>
</template>

<style lang="scss" scoped>
.table_img {
  width: 70px;
  height: 70px;
}
</style>
