<script setup lang="ts">
import { toRefs } from "vue";
import type {
  SelectCompOptions,
  FormItemArrTypes,
} from "@/types/elementPlusTypes";

interface Props {
  formItemData: FormItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { label, model, disableEditData } = toRefs(props.formItemData);

const { placeholder, width, selectList } = toRefs(
  props.formItemData.selectCompOptions as SelectCompOptions
);
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <el-select
      v-model="formModel[model]"
      :placeholder="placeholder"
      :style="{ width: width }"
      :disabled="disableEditData"
    >
      <el-option
        v-for="item in selectList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<style lang="scss" scoped></style>
