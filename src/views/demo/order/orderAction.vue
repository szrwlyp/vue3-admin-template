<script setup lang="ts">
import { ref, reactive } from "vue";
import Form from "@/components/formComp/index.vue";
import Table from "@/components/tableComp/index.vue";
import Divider from "@/components/dividerComp.vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import {
  tableCloumnConfigArr,
  formItemConfigArr,
  tableConfig,
  composableParams,
} from "@/compConfig/demo/orderActiveConfig";
import { useCURD } from "@/composables/view_crud";

const {
  pagination,
  tableData,
  queryParam,
  isDisabledBatchDelete,
  handleCurrentChange,
  handleSizeChange,
  handleFormSubmit,
  handleFormReset,
  handleSelectionChange,
  handleDeleteOperation,
  handleEditOperation,
  handleAddOperation,
} = useCURD(composableParams);

// 需要查询的item
const formItemArr = reactive(formItemConfigArr);

const tableCloumnArr = reactive(tableCloumnConfigArr);

const tableConfigOptions = reactive(tableConfig);
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
</template>

<style lang="scss" scoped></style>
