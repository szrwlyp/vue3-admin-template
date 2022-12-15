<script setup lang="ts">
import { computed, toRefs } from "vue";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: Table.TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<Table.TableCloumnArrTypes>(props.columnCompOptions);

// console.warn("默认组件", prop?.value);
</script>

<template>
  <div>{{ columnRow[prop as keyof typeof columnRow] }}</div>
</template>

<style lang="scss" scoped></style>
