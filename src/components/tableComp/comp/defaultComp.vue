<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<TableCloumnArrTypes>(props.columnCompOptions);

console.warn("默认组件", prop?.value);
</script>

<template>
  <div>{{ columnRow[prop as keyof typeof columnRow] }}</div>
</template>

<style lang="scss" scoped></style>
