<script setup lang="ts">
import { computed, toRefs } from "vue";
import { formatDate } from "@/utils/dateFun";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<TableCloumnArrTypes>(props.columnCompOptions);

const detaStr = computed(() => {
  return formatDate({
    format: "yyyy-MM-dd hh:mm:ss",
    date: props.columnRow[prop?.value as keyof typeof props.columnRow],
  });
});
</script>

<template>
  <div>
    {{ detaStr }}
  </div>
</template>

<style lang="scss" scoped></style>
