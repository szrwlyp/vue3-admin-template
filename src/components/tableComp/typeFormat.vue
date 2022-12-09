<script setup lang="ts">
import { inject, computed, toRefs } from "vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  compData: any;
  cloumnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();
const { prop } = toRefs<TableCloumnArrTypes>(props.cloumnCompOptions);

const columnType = inject("searchFormType") as any;

const typeStr = computed(() => {
  const { label } = columnType.find(
    (item: any) => item.value === props.compData[prop.value]
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
