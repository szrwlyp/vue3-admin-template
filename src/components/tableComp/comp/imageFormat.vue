<script setup lang="ts">
import { computed, toRefs } from "vue";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: Table.TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<Table.TableCloumnArrTypes>(props.columnCompOptions);
console.log();
const imgStr = computed(() => {
  return props.columnRow[prop?.value as keyof typeof props.columnRow];
});
</script>

<template>
  <img class="table_img" :src="imgStr" alt="" />
</template>

<style lang="scss" scoped>
.table_img {
  width: 70px;
  height: 70px;
}
</style>
