<script setup lang="ts">
import { inject, computed, toRefs } from "vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();
const { prop } = toRefs<TableCloumnArrTypes>(props.columnCompOptions);

const columnType = inject("searchFormType") as any;

const typeStr = computed(() => {
  const { label } = columnType.find(
    (item: any) =>
      item.value ===
      props.columnRow[prop?.value as keyof typeof props.columnRow]
  );
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
