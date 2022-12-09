<script setup lang="ts">
import { reactive, ref } from "vue";
import type { dialogHandleType } from "@/types/elementPlusTypes";

/**
 * DialogTypes
 * @param dialogVisible 对话框状态
 * @param dislogTitle 对话框标题
 */
interface DialogTypes {
  dialogVisible: boolean;
  dislogTitle: dialogHandleType;
}
defineProps<DialogTypes>();

const emits = defineEmits(["emitDialogCancel", "emitDialogConfirm"]);

const cancel = () => {
  emits("emitDialogCancel");
};

const close = () => {
  emits("emitDialogCancel");
};
const confirm = () => {
  emits("emitDialogConfirm");
};
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dislogTitle === 'add' ? '新增' : '编辑'"
    destroy-on-close
    @close="close"
  >
    <slot name="form"></slot>
    <slot name="table"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
