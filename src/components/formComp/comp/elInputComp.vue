<script setup lang="ts">
import { ref, computed, watch, toRefs } from "vue";
import type {
  formItemArrTypes,
  SearchType,
  InputCompOptions,
} from "@/types/elementPlusTypes";

interface Props {
  formItemData: formItemArrTypes;
  formModel: any;
}
const props = withDefaults(defineProps<Props>(), {});
// console.log(props);

let { label, prop, model, component, disableEditData } = toRefs(
  props.formItemData
);

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
} = toRefs(props.formItemData.inputCompOptions as InputCompOptions);

const emits = defineEmits(["emitSubmitButton"]);

/******************************************复合下拉框**************************************** */
const inputSlotRef = ref<string>(inputSlot?.value ?? "");
const inputSlotContentRef = ref<any>(inputSlotContent?.value);
const select = ref(model.value);

/**
 * 复合输入框切换占位文字
 */
const inputPlaceholder = ref(placeholder);
watch(
  () => model.value,
  () => {
    if (Array.isArray(inputSlotContentRef?.value)) {
      let { label } = inputSlotContentRef.value.find(
        (item: SearchType) => item.value === model.value
      );
      inputPlaceholder.value = `请输入${label}`;
    }
  },
  { immediate: true }
);

/**
 * 复合输入框改变事件
 */
const frontSelectValue = ref<string>(model.value);
const selectChange = (e: any) => {
  props.formModel[frontSelectValue.value] = "";
  model.value = e;
  frontSelectValue.value = e;
};

/**
 * input插槽判断
 */
const slotContent = computed(() => {
  let slotStr = "";
  if (Array.isArray(inputSlotContentRef?.value)) {
    slotStr = "array";
  } else {
    slotStr = "string";
  }
  return slotStr;
});

// 监听键盘回车事件
const handleKeyupEnter = () => {
  inputKeyupEnterEvent?.value && emits(inputKeyupEnterEvent?.value);
};
</script>

<template>
  <el-form-item :label="label" :prop="model">
    <el-input
      v-model.trim="formModel[model]"
      :style="{ width: width }"
      :placeholder="inputPlaceholder"
      :maxlength="maxlength"
      :disabled="disableEditData"
      :type="type"
      :show-password="type === 'password'"
      :size="size"
      :autosize="autosize"
      :show-word-limit="showWordLimit"
      @keyup.enter="handleKeyupEnter"
    >
      <!-- clearable -->
      <template v-if="inputSlotRef && inputSlotContentRef" #[inputSlotRef]>
        <template v-if="slotContent === 'array'">
          <el-select v-model="select" @change="selectChange">
            <el-option
              v-for="item in inputSlotContentRef"
              :key="item?.value"
              :label="item?.label"
              :value="item?.value"
            />
          </el-select>
        </template>
        <template v-else>
          <template
            v-if="inputSlotRef === 'prefix' || inputSlotRef === 'suffix'"
          >
            <el-icon><component :is="inputSlotContentRef"></component></el-icon>
          </template>
          <template v-else>
            {{ inputSlotContentRef }}
          </template>
        </template>
      </template>
    </el-input>
  </el-form-item>
</template>

<style lang="scss" scoped></style>
