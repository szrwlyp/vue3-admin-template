<script setup lang="ts">
import { ref, markRaw, computed, watch, onMounted } from "vue";
import { of, iif, switchMap, toArray, defer } from "rxjs";
import { deepClone } from "@/utils/index";
import type {
  formItemArrTypes,
  dialogHandleType,
} from "@/types/elementPlusTypes";
import Input from "./comp/elInputComp.vue";
import Select from "./comp/elSelectComp.vue";
import DatePicker from "./comp/elDateComp.vue";
import Button from "./comp/elButtonComp.vue";
import Switch from "./comp/elSwitchComp.vue";
import Checkbox from "./comp/elCheckboxComp.vue";
import Upload from "./comp/elUploadComp.vue";
import type { FormInstance, FormRules } from "element-plus";

/**
 * FormProp
 * @param inline 行内表单
 * @param rules 表单校验
 * @param formItemArr el-form-item form表单项
 * @param formData 表单数据
 * @param labelWidth label的宽度
 * @param dialogOperation dialog对话框类型（add,edit）
 *
 */
interface FormProp {
  inline?: boolean;
  rules?: FormRules;
  formItemArr: Array<formItemArrTypes>;
  formData: any;
  labelWidth?: string | number;
  dialogOperation?: dialogHandleType;
}
const props = defineProps<FormProp>();

// console.log(props);

/**
 * 表单选项是否禁止使用（disabled）
 * 添加表单或查询表单是不能禁止使用的，编辑表单有些选项才需要禁止编辑。
 */
watch(
  () => props.dialogOperation,
  (newValue: dialogHandleType) => {
    if (!newValue) return;
    props.formItemArr.map((item) => {
      if (Reflect.has(item, "disableEditData")) {
        if (newValue === "add") {
          item.disableEditData = false;
        } else {
          item.disableEditData = true;
        }
      }
      return item;
    });
    console.log(props.formItemArr);
  },
  { immediate: true }
);

// emit
const emits = defineEmits(["emitFormSubmit", "emitResetForm"]);

// 查询
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits("emitFormSubmit");
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 重置
const ruleFormRef = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emits("emitResetForm");
};

// 动态组件集合
const componentMap = new Map([
  ["input", { name: "input", tabComp: markRaw(Input) }],
  ["select", { name: "select", tabComp: markRaw(Select) }],
  ["datePicker", { name: "datePicker", tabComp: markRaw(DatePicker) }],
  ["button", { name: "button", tabComp: markRaw(Button) }],
  ["switch", { name: "switch", tabComp: markRaw(Switch) }],
  ["checkbox", { name: "checkbox", tabComp: markRaw(Checkbox) }],
  ["upload", { name: "upload", tabComp: markRaw(Upload) }],
]);

// 动态组件name
const componentName = computed(() => (componentName: any) => {
  return componentMap.get(componentName)?.tabComp;
});

const test = () => {
  console.log("aaa");
};
// 导出子组件的属性或方法
defineExpose({
  ruleFormRef,
});
</script>

<template>
  <el-form
    :inline="inline"
    :rules="rules"
    ref="ruleFormRef"
    :model="formData"
    label-width="auto"
    class="demo-form-inline"
  >
    <template v-for="(item, index) in formItemArr" :key="index">
      <component
        :is="componentName(item.component)"
        :style="{ margin: inline ? '0 16px 20px 0 ' : '0 0 20px 0' }"
        :formItemData="item"
        :formModel="formData"
        @emit-submit-button="submitForm(ruleFormRef)"
        @emit-reset-button="resetForm(ruleFormRef)"
        @emit-test="test"
      ></component>
    </template>
  </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-date-editor.el-input) {
  width: auto;
}
.demo-form-inline {
  padding-top: 22px;
}
</style>
