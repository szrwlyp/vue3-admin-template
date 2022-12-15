<script setup lang="ts">
import CascaderComp from "@/components/elementPlusComp/elCascaderComp.vue";

import { ref, computed, watch, toRefs } from "vue";

interface Props {
  formItemData: Form.FormItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});

let { label, prop, model, component, disableEditData, cascaderCompOptions } =
  toRefs(props.formItemData);

console.log(cascaderCompOptions?.value);

const handleCascaderChange = (value: string) => {
  console.log(value);
};

const handleExpandChange = (value: any) => {
  console.log(value);
};
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <CascaderComp
      v-model="formModel[model]"
      :disabled="disableEditData"
      :compOptions="cascaderCompOptions"
      @emit-change="handleCascaderChange"
      @emit-expand-change="handleExpandChange"
    />
  </el-form-item>
</template>

<style lang="scss" scoped></style>
