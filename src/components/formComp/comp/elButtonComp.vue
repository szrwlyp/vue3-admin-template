<script setup lang="ts">
import { toRefs } from "vue";
interface Props {
  formItemData: Form.FormItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { buttonArr } = toRefs(
  props.formItemData.buttonCompOptions as Form.ButtonCompOptions
);

console.log(buttonArr?.value);
const emits = defineEmits(["emitSubmitButton", "emitResetButton"]);
</script>

<template>
  <el-form-item>
    <template v-for="(item, index) in buttonArr" :key="index">
      <el-button
        :style="{ width: item.width }"
        :type="item.type"
        :icon="item.icon"
        :plain="item.plain"
        :size="item.size"
        :loading="item.loading"
        @click="emits(item.emitEvent)"
        >{{ item.buttonText }}</el-button
      >
    </template>
  </el-form-item>
</template>

<style lang="scss" scoped></style>
