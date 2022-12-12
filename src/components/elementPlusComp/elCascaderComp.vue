<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { CascaderCompOptions } from "@/types/elementPlusTypes";

interface Props {
  compOptions: any;
}

const props = withDefaults(defineProps<Props>(), {});

const {
  placeholder,
  options,
  cascaderProps,
  clearable,
  showAllLevels,
  filterable,
  size,
  emitChangeEvent,
  emitExpandChangeEvent,
  width,
} = toRefs<CascaderCompOptions>(props.compOptions);

const emits = defineEmits(["emitChange", "emitExpandChange"]);

// 当绑定值变化时触发的事件
const handleChange = (value: string) => {
  emitChangeEvent?.value && emits(emitChangeEvent?.value, value);
};

// 当展开节点发生变化时触发
const handleExpandChange = (value: any) => {
  emitExpandChangeEvent?.value && emits(emitExpandChangeEvent.value, value);
};
</script>

<template>
  <el-cascader
    :options="options"
    :props="cascaderProps"
    :style="{ width: width }"
    :placeholder="placeholder"
    :clearable="clearable"
    :show-all-levels="showAllLevels"
    :filterable="filterable"
    :size="size"
    @change="handleChange"
    @expand-change="handleExpandChange"
  />
</template>

<style lang="scss" scoped></style>
