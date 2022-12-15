<script setup lang="ts">
import { toRefs, onMounted } from "vue";

interface Props {
  formItemData: Form.FormItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { label, model, disableEditData } = toRefs(props.formItemData);

const { switchOffColor, switchOnColor, size } = toRefs(
  props.formItemData.switchCompOptions as Form.SwitchCompOptions
);
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <el-switch
      v-model="formModel[model]"
      :style="{
        '--el-switch-on-color': switchOnColor,
        '--el-switch-off-color': switchOffColor,
      }"
      :size="size"
      :disabled="disableEditData"
    />
  </el-form-item>
</template>

<style lang="scss" scoped></style>
