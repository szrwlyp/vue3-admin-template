<script setup lang="ts">
import { computed, toRefs } from "vue";
import { tableEventSubject$ } from "../observableSubject";

interface Props {
  columnRow: any;
  columnIndex: number;
  columnCompOptions: Table.TableCloumnArrTypes;
}
const props = defineProps<Props>();

const emits = defineEmits(["emitEditOperation", "emitDeleteOperation"]);

const { compOptions } = toRefs<Table.TableCloumnArrTypes>(
  props.columnCompOptions
);
// console.log(props.columnCompOptions);

// 修改，删除操作
const buttonOperation = (emitName: Table.EmitEventName) => {
  let message: Table.TableEventEmit = {
    emitEventName: emitName,
    emitParams: { index: props.columnIndex, row: props.columnRow },
  };
  tableEventSubject$.next(message);
};
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
    @click="buttonOperation(item.emitEvent)"
    >{{ item.buttonText }}</el-button
  >
</template>

<style lang="scss" scoped></style>
