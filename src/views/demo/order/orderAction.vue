<script setup lang="ts">
import {
  ref,
  onUnmounted,
  reactive,
  provide,
  onMounted,
  nextTick,
  computed,
} from "vue";
import { of, skip, take, toArray, map, fromEvent, debounceTime } from "rxjs";
import {
  mainScrollTop,
  resetData,
  deepClone,
  randomRange,
} from "@/utils/index";
import Form from "@/components/formComp/index.vue";
import Table from "@/components/tableComp/index.vue";
import Divider from "@/components/dividerComp.vue";
import { getJournalData } from "@/modules/journal";
import { Delete, Plus } from "@element-plus/icons-vue";
import {
  u_ElMessageBoxConfig,
  u_ElMessage,
  tableLoadingInstance,
  tableLoading,
} from "@/utils/elementPlus";
import type { dialogHandleType } from "@/types/elementPlusTypes";
import {
  tableCloumnConfigArr,
  formItemConfigArr,
  searchFormTypeConfig,
} from "@/compConfig/demo/orderActiveConfig";

// 依赖注入
const searchFormType = searchFormTypeConfig;
provide("searchFormType", searchFormType);

/************************************************* 查询 ******************************************* */
// 查询条件
const searchFormData = ref({
  name: "",
  type: "",
  deviceid: "",
});

// 需要查询的item
const formItemArr = reactive(formItemConfigArr);
// 提交查询
const handleFormSubmit = () => {
  console.log("提交查询", searchFormData.value);
  // orderDataStore.searchOrderData(searchFormData.value);
  pagination.value.currentPage = 1;
  getTableData();
};

const handleFormReset = () => {
  // orderDataStore.resetSearchForm();
  pagination.value.currentPage = 1;
  getTableData();
};

/*************************************************操作按钮*********************************************/
// 是否禁用批量删除按钮
const isDisabledBatchDelete = ref<boolean>(true);
const addData = () => {};

/********************************************* table(表格) *************************************/

let tableData = ref<Array<any>>([]);
const tableCloumnArr = reactive(tableCloumnConfigArr);
const getTableData = () => {
  let params = Object.assign(
    {
      appPage: "",
      deviceid: "",
      name: "",
      observedCustomer: "",
      openid: "",
      page: pagination.value.currentPage,
      pageSize: pagination.value.pageSize,
      type: "",
    },
    searchFormData.value
  );
  console.log(params);

  tableLoading({
    text: "数据加载中...",
    background: "rgba(255, 255, 255, 0.9)",
  });

  getJournalData(params).subscribe({
    next: (res) => {
      console.log(res);
      let { code, data } = res;
      tableData.value = data?.logs ?? [];
      pagination.value.total = data?.count ?? 0;
      mainScrollTop();
      tableLoadingInstance?.close();
    },
  });
};

const handleSelectionChange = () => {};
const handleEditOperation = () => {};
const handleDeleteOperation = () => {};

/******************************分页****************************/
/**
 * 分页
 * @param total 总条数
 * @param currentPage 当前页
 * @param pageSize 当前页条数
 */
interface Pagination {
  total: number;
  currentPage: number;
  pageSize: number;
}
const pagination = ref<Pagination>({
  total: 0,
  currentPage: 1,
  pageSize: 10,
});

// 当前分页改变
const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  console.log("当前分页改变");
  getTableData();
};

// 当前分页数据条数改变
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  console.log("当前分页数据条数改变");
  getTableData();
};

onMounted(() => {
  getTableData();
});

onUnmounted(() => {});
</script>

<template>
  <!-- 搜索操作 -->
  <Form
    ref="formRef"
    :inline="true"
    :form-item-arr="formItemArr"
    :form-data="searchFormData"
    @emit-form-submit="handleFormSubmit"
    @emit-reset-form="handleFormReset"
  />

  <!-- 分割线 -->
  <Divider />

  <!-- 数据操作 -->
  <el-row ref="operatorRef" class="mb-4" style="padding: 18px 0 10px 0">
    <el-button type="primary" :icon="Plus" @click="addData">新增</el-button>
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
    :pagination="pagination"
    @emit-selection-change="handleSelectionChange"
    @emit-edit-operation="handleEditOperation"
    @emit-delete-operation="handleDeleteOperation"
    @emit-pagination-current-change="handleCurrentChange"
    @emit-pagination-size-change="handleSizeChange"
  />
</template>

<style lang="scss" scoped></style>
