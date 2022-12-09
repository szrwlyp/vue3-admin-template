<script setup lang="ts">
import { computed, toRefs } from "vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  compData: any;
  cloumnCompOptions: TableCloumnArrTypes;
}
const props = defineProps<Props>();

const emits = defineEmits(["emitEditOperation", "emitDeleteOperation"]);

const { compOptions } = toRefs<TableCloumnArrTypes>(props.cloumnCompOptions);
// console.log(props.cloumnCompOptions);
</script>

<template>
  <el-button
    v-for="(item, index) in compOptions?.operationButtonArr"
    :key="index"
    :size="item.size"
    :type="item.type"
    :icon="item.icon"
    :circle="item.circle"
    :disabled="item.disabled"
    :text="item.text"
    :bg="item.bg"
    @click="emits(item.emitEvent)"
    >{{ item.buttonText }}</el-button
  >
</template>

<style lang="scss" scoped></style>
