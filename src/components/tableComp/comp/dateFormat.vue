<script setup lang="ts">
import { computed, toRefs } from "vue";
import { formatDate } from "@/utils/dateFun";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: Table.TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<Table.TableCloumnArrTypes>(props.columnCompOptions);

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
