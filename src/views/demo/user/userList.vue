<script setup lang="ts">
import { ref, reactive } from "vue";
import Form from "@/components/formComp/index.vue";
import Table from "@/components/tableComp/index.vue";
import Dialog from "@/components/dialogComp/index.vue";
import Divider from "@/components/dividerComp.vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import {
  tableCloumnConfigArr,
  formItemConfigArr,
  tableConfig,
  addOrEditItemConfigArr,
} from "@/compConfig/demo/userListConfig";
import { useCURD } from "@/composables/view_crud";
const composableParams = {
  queryParam: ref({
    name: "",
    type: "",
    deviceid: "",
  }),
  dialogFormData: ref({
    id: "",
    user_name: "",
    age: "",
    address: "",
  }),

  url: {
    list: "/magic/test/getTestUserList",
    delete: "/magic/test/delete",
    add: "/magic/test/add",
    edit: "/magic/test/edit",
  },
};
const {
  tableData,
  pagination,
  queryParam,
  isDisabledBatchDelete,
  handleCurrentChange,
  handleSizeChange,
  handleFormSubmit,
  handleFormReset,
  dialogVisible,
  dialogOperation,
  dialogFormRef,
  dialogFormData,
  handleSelectionChange,
  handleDeleteOperation,
  handleEditOperation,
  handleAddOperation,
  handleDialogCancel,
  handleDialogConfirm,
} = useCURD(composableParams);

// 需要查询的item
const formItemArr = reactive(formItemConfigArr);

const tableCloumnArr = reactive(tableCloumnConfigArr);

const tableConfigOptions = reactive(tableConfig);
// 需要添加或修改的item
const addOrEditItemArr = reactive(addOrEditItemConfigArr);
</script>

<template>
  <!-- 搜索操作 -->
  <Form
    ref="formRef"
    :inline="true"
    :form-item-arr="formItemArr"
    :form-data="queryParam"
    @emit-form-submit="handleFormSubmit"
    @emit-reset-form="handleFormReset"
  />

  <!-- 分割线 -->
  <Divider />

  <!-- 数据操作 -->
  <el-row ref="operatorRef" class="mb-4" style="padding: 18px 0 10px 0">
    <el-button type="primary" :icon="Plus" @click="handleAddOperation"
      >新增</el-button
    >
    <el-button
      type="danger"
      :disabled="isDisabledBatchDelete"
      :icon="Delete"
      @click="handleDeleteOperation"
      >批量删除</el-button
    >
  </el-row>
  <!-- 数据表格 -->
  <Table
    :table-column-arr="tableCloumnArr"
    :table-data="tableData"
    :table-options="tableConfigOptions"
    :pagination="pagination"
    @emit-selection-change="handleSelectionChange"
    @emit-edit-operation="handleEditOperation"
    @emit-delete-operation="handleDeleteOperation"
    @emit-pagination-current-change="handleCurrentChange"
    @emit-pagination-size-change="handleSizeChange"
  />

  <!-- 弹框 -->
  <Dialog
    :dialog-visible="dialogVisible"
    :dislog-title="dialogOperation"
    @emit-dialog-cancel="handleDialogCancel"
    @emit-dialog-confirm="handleDialogConfirm"
  >
    <template #form>
      <div style="padding-left: 50px">
        <Form
          ref="dialogFormRef"
          :form-item-arr="addOrEditItemArr"
          :form-data="dialogFormData"
          :dialog-operation="dialogOperation"
        />
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
