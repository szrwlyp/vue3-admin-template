<script setup lang="ts">
import { toRefs, onMounted } from "vue";
import type {
  CheckboxCompOptions,
  formItemArrTypes,
} from "@/types/elementPlusTypes";

interface Props {
  formItemData: formItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { label, model, disableEditData } = toRefs(props.formItemData);

const { checkboxArr, width } = toRefs(
  props.formItemData.checkboxCompOptions as CheckboxCompOptions
);
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <el-checkbox-group
      v-model="formModel[model]"
      :style="{ width: width }"
      :disabled="disableEditData"
    >
      <template v-for="(item, index) in checkboxArr" :key="index">
        <el-checkbox :label="item.value" :disabled="item.disabled">{{
          item.label
        }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </el-form-item>
</template>

<style lang="scss" scoped></style>
