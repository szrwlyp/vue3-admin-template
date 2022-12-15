<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  formItemData: Form.FormItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { label, model, disableEditData } = toRefs(props.formItemData);
const {
  type,
  placeholder,
  format,
  valueFormat,
  startPlaceholder,
  endPlaceholder,
  shortcuts,
  disabledDate,
  width,
} = toRefs(props?.formItemData?.dateCompOptions as Form.DateCompOptions);
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <el-date-picker
      v-model="formModel[model]"
      :style="{ width: width }"
      :placeholder="placeholder"
      :type="type"
      :disabled="disableEditData"
      :format="format"
      :value-format="valueFormat"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :shortcuts="shortcuts"
      :disabled-date="disabledDate"
    />
  </el-form-item>
</template>

<style lang="scss" scoped></style>
