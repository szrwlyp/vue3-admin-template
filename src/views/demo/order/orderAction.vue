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
import Pagination from "@/components/paginationComp.vue";
import Divider from "@/components/dividerComp.vue";
import { getJournalData } from "@/modules/journal";
import { Delete, Plus } from "@element-plus/icons-vue";
import {
  u_ElMessageBoxConfig,
  u_ElMessage,
  U_ElLoadingInstance,
  U_ElLoadingFun,
} from "@/utils/elementPlus";
import type {
  formItemArrTypes,
  SearchType,
  dialogHandleType,
} from "@/types/elementPlusTypes";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

// 依赖注入

const searchFormType: Array<SearchType> = [
  {
    value: "open",
    label: "打开小程序",
  },
  {
    value: "resume",
    label: "切换到前台",
  },
  {
    value: "background",
    label: "切换到后台",
  },
  {
    value: "mercicard",
    label: "Merci card",
  },
  {
    value: "sleep",
    label: "睡眠报告页",
  },
  {
    value: "index",
    label: "实时数据页",
  },
  {
    value: "history",
    label: "历史数据页",
  },
  {
    value: "stay",
    label: "驻留信息页",
  },
  {
    value: "message",
    label: "消息报告页",
  },
  {
    value: "me",
    label: "我的页",
  },
  {
    value: "family",
    label: "家庭健康简报页",
  },
  {
    value: "share",
    label: "分享",
  },
  {
    value: "family_sleep",
    label: "睡眠详情",
  },
  {
    value: "family_vital",
    label: "生命体征详情",
  },
  {
    value: "xiaowei_report",
    label: "小薇简报页",
  },
];
provide("searchFormType", searchFormType);

/************************************************* 查询 ******************************************* */
// 查询条件
const searchFormData = ref({
  name: "",
  type: "",
  deviceid: "",
});

// 需要查询的item
const formItemArr = reactive<Array<formItemArrTypes>>([
  {
    label: "用户昵称",
    prop: "name",
    model: "name",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入用户昵称",
    },
  },
  {
    label: "操作类型",
    prop: "type",
    model: "type",
    component: "select",
    selectCompOptions: {
      placeholder: "请选择操作类型",
      selectList: [
        {
          value: "open",
          label: "打开小程序",
        },
        {
          value: "resume",
          label: "切换到前台",
        },
        {
          value: "background",
          label: "切换到后台",
        },
        {
          value: "mercicard",
          label: "Merci card",
        },
        {
          value: "sleep",
          label: "睡眠报告页",
        },
        {
          value: "index",
          label: "实时数据页",
        },
        {
          value: "history",
          label: "历史数据页",
        },
        {
          value: "stay",
          label: "驻留信息页",
        },
        {
          value: "message",
          label: "消息报告页",
        },
        {
          value: "me",
          label: "我的页",
        },
        {
          value: "family",
          label: "家庭健康简报页",
        },
        {
          value: "share",
          label: "分享",
        },
        {
          value: "family_sleep",
          label: "睡眠详情",
        },
        {
          value: "family_vital",
          label: "生命体征详情",
        },
        {
          value: "xiaowei_report",
          label: "小薇简报页",
        },
      ],
    },
  },
  {
    label: "设备ID",
    prop: "deviceid",
    model: "deviceid",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入设备ID",
    },
  },
  {
    label: "订单日期",
    prop: "order_date",
    model: "order_date",
    component: "datePicker",
    dateCompOptions: {
      placeholder: "请选择日期",
      type: "date",
      valueFormat: "x",
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now();
      },
    },
  },
  {
    label: "button",
    prop: "button",
    model: "button",
    component: "button",
    buttonCompOptions: {
      buttonArr: [
        {
          buttonText: "查询",
          type: "primary",
          icon: "Search",
          // size: "large",
          emitEvent: "emitSubmitButton",
        },
        {
          buttonText: "重置",
          icon: "Refresh",
          plain: true,
          // size: "large",
          emitEvent: "emitResetButton",
        },
      ],
    },
  },
]);
// 提交查询
const handleFormSubmit = () => {
  console.log("提交查询", searchFormData.value);
  // orderDataStore.searchOrderData(searchFormData.value);
  pagingCurrentPage.value = 1;
  getTableData();
};

const handleFormReset = () => {
  // orderDataStore.resetSearchForm();
  pagingCurrentPage.value = 1;
  getTableData();
};

/*************************************************操作按钮*********************************************/
// 是否禁用批量删除按钮
const isDisabledBatchDelete = ref<boolean>(true);
const addData = () => {};

/********************************************* table(表格) *************************************/

let tableData = ref<Array<any>>([]);
const tableCloumnArr = reactive<Array<TableCloumnArrTypes>>([
  {
    prop: "openid",
    label: "openid",
  },
  {
    prop: "headUrl",
    label: "用户头像",
    isChange: true,
    component: "imageFormat",
  },
  {
    prop: "name",
    label: "用户昵称",
  },
  {
    prop: "type",
    label: "操作类型",
    isChange: true,
    component: "typeFormat",
  },
  {
    prop: "duration",
    label: "访问时长",
  },
  {
    prop: "time",
    label: "访问时间",
    isChange: true,
    component: "dateFormat",
  },
  {
    prop: "page",
    label: "访问页面",
  },
  {
    prop: "province",
    label: "访问地区",
  },
  {
    prop: "log",
    label: "日志",
  },
]);

const getTableData = () => {
  let params = Object.assign(
    {
      appPage: "",
      deviceid: "",
      name: "",
      observedCustomer: "",
      openid: "",
      page: pagingCurrentPage.value,
      pageSize: pagingPageSize.value,
      type: "",
    },
    searchFormData.value
  );
  console.log(params);

  // U_ElLoadingFun({
  //   target: tableRef.value.$el,
  //   text: "数据加载中...",
  //   background: "rgba(255, 255, 255, 0.9)",
  // });

  getJournalData(params).subscribe({
    next: (res) => {
      console.log(res);
      let { code, data } = res;
      tableData.value = data?.logs ?? [];
      pagingTotal.value = data?.count ?? 0;
      mainScrollTop();
      // U_ElLoadingInstance?.close();
    },
  });
};

const handleSelectionChange = () => {};
const handleEditOperation = () => {};
const handleDeleteOperation = () => {};

const tableRef = ref();

/******************************分页****************************/
// 总条数
const pagingTotal = ref(0);
// 当前页
const pagingCurrentPage = ref(1);
// 当前页条数
const pagingPageSize = ref(10);
// 当前分页改变
const handleCurrentChange = (val: number) => {
  pagingCurrentPage.value = val;
  console.log("当前分页改变");
  getTableData();
};

// 当前分页数据条数改变
const handleSizeChange = (val: number) => {
  pagingPageSize.value = val;
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
  <!-- <Table
    ref="tableRef"
    :table-column-arr="tableCloumnArr"
    :table-data="tableData"
    :total="pagingTotal"
    :currentPage="pagingCurrentPage"
    :pageSize="pagingPageSize"
    @emit-selection-change="handleSelectionChange"
    @emit-edit-operation="handleEditOperation"
    @emit-delete-operation="handleDeleteOperation"
    @emit-pagination-current-change="handleCurrentChange"
    @emit-pagination-size-change="handleSizeChange"
  /> -->
</template>

<style lang="scss" scoped></style>
