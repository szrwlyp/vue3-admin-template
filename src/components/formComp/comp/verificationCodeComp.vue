<script setup lang="ts">
import { toRefs, ref } from "vue";
import { useTool } from "@/composables/tool";

const { resetCode, codeUrl } = useTool();

interface Props {
  formItemData: Form.FormItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { label, model, disableEditData } = toRefs(props.formItemData);
let {
  placeholder,
  width,
  type,
  maxlength,
  inputSlot,
  inputSlotContent,
  inputKeyupEnterEvent,
  size,
  autosize,
  showWordLimit,
} = toRefs(props.formItemData.inputCompOptions as Form.InputCompOptions);
const inputPlaceholder = ref(placeholder);
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <div class="code">
      <el-input
        v-model.trim="formModel[model]"
        :placeholder="inputPlaceholder"
        :type="type"
      >
      </el-input>
      <img class="code-img" :src="codeUrl" @click="resetCode" alt="" />
    </div>
  </el-form-item>
</template>

<style lang="scss" scoped>
.code {
  display: flex;
  .code-img {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
