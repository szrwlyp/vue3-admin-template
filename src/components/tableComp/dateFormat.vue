<script setup lang="ts">
import { computed, toRefs } from "vue";
import { formatDate } from "@/utils/dateFun";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  compData: any;
  cloumnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();

const { prop } = toRefs<TableCloumnArrTypes>(props.cloumnCompOptions);

const detaStr = computed(() => {
  return formatDate({
    format: "yyyy-MM-dd hh:mm:ss",
    date: props.compData[prop.value],
  });
});
</script>

<template>
  <div>
    {{ detaStr }}
  </div>
</template>

<style lang="scss" scoped></style>
