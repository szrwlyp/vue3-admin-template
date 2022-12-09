<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  compData: any;
  cloumnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<TableCloumnArrTypes>(props.cloumnCompOptions);

const imgStr = computed(() => {
  return props.compData[prop.value];
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
