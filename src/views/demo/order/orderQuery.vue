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
import { Delete, Plus } from "@element-plus/icons-vue";
import Table from "@/components/tableComp/index.vue";
import Pagination from "@/components/paginationComp.vue";
import Form from "@/components/formComp/index.vue";
import Divider from "@/components/dividerComp.vue";
import Dialog from "@/components/dialogComp/index.vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";
import type {
  formItemArrTypes,
  SearchType,
  dialogHandleType,
} from "@/types/elementPlusTypes";
import { orderData } from "./data";
import {
  mainScrollTop,
  resetData,
  deepClone,
  randomRange,
} from "@/utils/index";
import { u_ElMessageBoxConfig, u_ElMessage } from "@/utils/elementPlus";
import type { FormInstance, FormRules } from "element-plus";
import { useOrderDataStore } from "@/stores/orderData";
import { storeToRefs } from "pinia";

const orderDataStore = useOrderDataStore();

const { set_orderData } = storeToRefs(orderDataStore);

// 依赖注入
const searchFormType: Array<SearchType> = [
  {
    value: 1,
    label: "已发货",
  },
  {
    value: 2,
    label: "已确认",
  },
  {
    value: 3,
    label: "待发货",
  },
];
provide("searchFormType", searchFormType);

/************************************************* 查询 ******************************************* */
// 查询条件
const searchFormData = ref({
  order_id: "",
  order_type: "",
  order_date: "",
  goods_name: "",
  phone: "",
});

// 需要查询的item
const formItemArr = reactive<Array<formItemArrTypes>>([
  {
    label: "复合查询",
    prop: "goods_name",
    model: "goods_name",
    component: "input",
    inputCompOptions: {
      placeholder: "",
      type: "text",
      inputSlot: "prepend",
      inputSlotContent: [
        {
          value: "goods_name",
          label: "商品名称",
        },
        {
          value: "phone",
          label: "电话",
        },
      ],
    },
  },
  // {
  //   label: "",
  //   prop: "order_id",
  //   model: "order_id",
  //   component: "input",
  //   compOptions: {
  //     placeholder: "请输入",
  //     inputSlot: "prepend",
  //     inputSlotContent: "Http://",
  //   },
  // },
  {
    label: "订单ID",
    prop: "order_id",
    model: "order_id",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入订单ID",
    },
  },
  {
    label: "订单类型",
    prop: "order_type",
    model: "order_type",
    component: "select",
    selectCompOptions: {
      placeholder: "请选择订单类型",
      selectList: [
        {
          value: 1,
          label: "已发货",
        },
        {
          value: 2,
          label: "已确认",
        },
        {
          value: 3,
          label: "待发货",
        },
      ],
    },
  },
  {
    label: "订单日期",
    prop: "order_date",
    model: "order_date",
    component: "datePicker",
    dateCompOptions: {
      placeholder: "请选择日期",
      type: "datetime",
      // width: "300px",
      // format: "YYYY/MM/DD",
      // startPlaceholder: "请输入开始值",
      // endPlaceholder: "请输入结束值",
      valueFormat: "x",
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now();
      },
      // shortcuts: [
      //   {
      //     text: "本月",
      //     value: [new Date(), new Date()],
      //   },
      //   {
      //     text: "今年",
      //     value: () => {
      //       const end = new Date();
      //       const start = new Date(new Date().getFullYear(), 0);
      //       return [start, end];
      //     },
      //   },
      //   {
      //     text: "过去6个月",
      //     value: () => {
      //       const end = new Date();
      //       const start = new Date();
      //       start.setMonth(start.getMonth() - 6);
      //       return [start, end];
      //     },
      //   },
      // ],
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
  // handleTableData();
};

const handleFormReset = () => {
  orderDataStore.resetSearchForm();
  handleTableData();
};

/*************************************************操作按钮*********************************************/
// 是否禁用批量删除按钮
const isDisabledBatchDelete = ref<boolean>(true);
// 添加操作
const addData = () => {
  dialogVisible.value = true;
  dialogOperation.value = "add";
  addOrEditData.value.order_id = randomRange(20);
};

/********************************************* table(表格) *************************************/

// 写入所有orderData到全局状态中
if (!set_orderData.value.length) {
  of(...orderData)
    .pipe(
      map((res: any) => {
        return { ...res, order_id: randomRange(20) };
      }),
      toArray()
    )
    .subscribe({
      next: (res) => {
        orderDataStore.addOrderData(res);
      },
    });
}

// 表格订单数据
let tableData = ref<Array<any>>([]);

const tableCloumnArr: Array<TableCloumnArrTypes> = reactive([
  {
    prop: "order_id",
    label: "订单ID",
  },
  {
    prop: "order_type",
    label: "订单类型",
    isChange: true,
    component: "typeFormat",
  },
  {
    prop: "order_date",
    label: "订单时间",
    isChange: true,
    component: "dateFormat",
  },
  {
    prop: "goods_name",
    label: "商品名称",
  },
  {
    prop: "goods_img",
    label: "商品图片",
    isChange: true,
    component: "imageFormat",
  },
  {
    prop: "user_name",
    label: "收货人",
  },
  {
    prop: "address",
    label: "收货地址",
  },
  {
    prop: "phone",
    label: "收货人电话",
  },
  {
    prop: "",
    label: "操作",
    isChange: true,
    component: "buttonFormat",
    compOptions: {
      operationButtonArr: [
        {
          size: "large",
          type: "primary",
          icon: "Edit",
          emitEvent: "emitEditOperation",
          circle: true,
        },
        {
          // buttonText: "删除",
          size: "large",
          type: "danger",
          icon: "Delete",
          emitEvent: "emitDeleteOperation",
          circle: true,
        },
      ],
    },
  },
]);

// 处理表格选中的数据列
const batchSelectionData = ref<Array<any>>([]);
const handleSelectionChange = (val: any) => {
  console.log(val);
  batchSelectionData.value = val;
  isDisabledBatchDelete.value = val.length >= 2 ? false : true;
};

// 修改表格行数据
const handleEditOperation = (index: number, row: any) => {
  console.log(index);
  console.log(row);
  dialogVisible.value = true;
  dialogOperation.value = "edit";
  if (!Array.isArray(row.goods_img)) {
    row.goods_img = [row.goods_img];
  }
  addOrEditData.value = row;
};
// 删除表格行数据
const handleDeleteOperation = (index?: number, row?: any) => {
  console.log(row);

  if (row && !batchSelectionData.value.length) {
    batchSelectionData.value.push(row);
  }
  console.log(batchSelectionData.value);

  u_ElMessageBoxConfig(
    "删除",
    `是否${isDisabledBatchDelete.value ? "删除该数据" : "批量删除选中的内容"}?`,
    "Delete",
    "error"
  )
    .then(() => {
      orderDataStore.deleteOrderData(batchSelectionData.value);
      u_ElMessage({ type: "success", message: "删除成功！" });
      handleTableData();
    })
    .catch(() => {
      // u_ElMessage("error", "删除失败！");
    });
};

/******************************分页****************************/
// 总条数
const pagingTotal = computed(() => {
  return set_orderData.value.length;
});
// 当前页
const pagingCurrentPage = ref(1);
// 当前页条数
const pagingPageSize = ref(10);
// 当前分页改变
const handleCurrentChange = (val: number) => {
  pagingCurrentPage.value = val;
  handleTableData();
  mainScrollTop();
};

// 当前分页数据条数改变
const handleSizeChange = (val: number) => {
  pagingPageSize.value = val;

  handleTableData();
  mainScrollTop();
};

// 模拟后端接口实现分页，条数
const handleTableData = () => {
  let currentPage = pagingCurrentPage.value,
    pageSize = pagingPageSize.value;

  let skipIndex = currentPage * pageSize - pageSize;
  let originOrderData = orderDataStore.getOrderData();
  of(...originOrderData)
    .pipe(skip(skipIndex), take(pageSize), toArray())
    .subscribe({
      next: (res) => {
        tableData.value = res;
      },
    });
};

/***************************************** dialog对话框 **************************************/
const dialogVisible = ref(false);
const dialogOperation = ref<dialogHandleType>();
const dialogSlot = ref("form");
const dialogFormRef = ref();

interface addOrEditDataType {
  order_id: string;
  order_type: number | string;
  order_date: string | number;
  goods_name: string;
  user_name: string;
  address: string;
  phone: number | string | undefined;
  goods_state: boolean | string | number;
  checkbox: Array<any>;
  remarks: string;
  goods_img: Array<{ url: string } | string>;
}
const addOrEditData = ref<addOrEditDataType>({
  order_id: "",
  order_type: "",
  order_date: "",
  goods_name: "",
  user_name: "",
  address: "",
  phone: "",
  goods_state: false,
  checkbox: [1, 2],
  remarks: "",
  goods_img: [],
});

// 表单校验
const addOrEditFules = reactive<FormRules>({
  order_id: [
    {
      type: "string",
      required: true,
      message: "请填写订单ID",
      trigger: "blur",
    },
  ],
  order_type: [
    { required: true, message: "请选择订单类型", trigger: "change" },
  ],
  order_date: [
    {
      type: "date",
      required: true,
      message: "请选择订单日期",
      trigger: "change",
    },
  ],
});

// 需要添加或修改的item
const addOrEditItemArr = reactive<Array<formItemArrTypes>>([
  {
    label: "订单ID",
    prop: "order_id",
    model: "order_id",
    component: "input",
    disableEditData: true,
    inputCompOptions: {
      placeholder: "请输入订单ID",
      width: "300px",
      type: "text",
    },
  },
  {
    label: "订单类型",
    prop: "order_type",
    model: "order_type",
    component: "select",
    selectCompOptions: {
      placeholder: "请选择订单类型",
      width: "300px",
      selectList: [
        {
          value: 1,
          label: "已发货",
        },
        {
          value: 2,
          label: "已确认",
        },
        {
          value: 3,
          label: "待发货",
        },
      ],
    },
  },
  {
    label: "订单日期",
    prop: "order_date",
    model: "order_date",
    component: "datePicker",
    disableEditData: true,
    dateCompOptions: {
      placeholder: "请选择日期",
      width: "300px",
      type: "date",
      valueFormat: "x",
      disabledDate: (time: Date) => {
        return time.getTime() > Date.now();
      },
    },
  },
  {
    label: "商品名称",
    prop: "goods_name",
    model: "goods_name",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入商品名称",
      width: "300px",
    },
  },
  {
    label: "商品图片",
    prop: "goods_img",
    model: "goods_img",
    component: "upload",
    uploadCompOptions: {
      // type: "text",
      // placeholder: "请输入商品名称",
      width: "300px",
    },
  },
  {
    label: "收货人",
    prop: "user_name",
    model: "user_name",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入收货人",
      width: "300px",
    },
  },
  {
    label: "收货地址",
    prop: "address",
    model: "address",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入收货地址",
      width: "300px",
    },
  },
  {
    label: "收货人电话",
    prop: "phone",
    model: "phone",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "请输入收货人电话",
      width: "300px",
      maxlength: 11,
    },
  },
  {
    label: "是否上架",
    prop: "goods_state",
    model: "goods_state",
    component: "switch",
    disableEditData: true,
    switchCompOptions: {
      switchOffColor: "#ff4949",
      // switchOnColor: "#13ce66",
      // size: "large",
    },
  },
  {
    label: "多选",
    prop: "checkbox",
    model: "checkbox",
    component: "checkbox",
    checkboxCompOptions: {
      width: "300px",
      checkboxArr: [
        {
          label: "选项1",
          value: 1,
          disabled: true,
        },
        {
          label: "选项2",
          value: 2,
          disabled: false,
        },
        {
          label: "选项3",
          value: 3,
          disabled: false,
        },
        {
          label: "选项4",
          value: 4,
          disabled: false,
        },
        {
          label: "选项5",
          value: 5,
          disabled: false,
        },
      ],
    },
  },
  {
    label: "备注",
    prop: "remarks",
    model: "remarks",
    component: "input",
    inputCompOptions: {
      type: "textarea",
      placeholder: "请输入收货人",
      autosize: { minRows: 2, maxRows: 4 },
      maxlength: 30,
      showWordLimit: true,
      width: "300px",
    },
  },
]);

const handleDialogCancel = () => {
  // 对话框关闭移除校验结果
  dialogFormRef.value.ruleFormRef.resetFields();

  let dataObj = deepClone(addOrEditData.value);
  addOrEditData.value = resetData(dataObj);

  dialogVisible.value = false;
};

const handleDialogConfirm = async () => {
  await dialogFormRef.value.ruleFormRef.validate(
    (valid: boolean, fields: any) => {
      if (valid) {
        console.log("submit!");
        console.log(addOrEditData.value);

        console.log(dialogOperation.value);
        if (dialogOperation.value === "add") {
          orderDataStore.addOrderData(addOrEditData.value);
        } else {
          orderDataStore.editOrderData(addOrEditData.value);
        }

        // dialogVisible.value = false;

        // handleTableData();
        // u_ElMessage({
        //   type: "success",
        //   message: `${dialogOperation.value === "add" ? "新增" : "编辑"}成功！`,
        // });
      } else {
        console.log("error submit!", fields);
      }
    }
  );
};

/**
 * table设置动态高度值
 * 113 是headerBar，tabbar两个组件的高度
 */
const tableHeight = ref<number>(0);
const formRef = ref();
const tableRef = ref();
const operatorRef = ref();
const paginationRef = ref();
const setTableHeight = async () => {
  tableHeight.value =
    formRef.value.$el.clientHeight +
    operatorRef.value.$el.clientHeight +
    paginationRef.value.$el.clientHeight +
    113;
};
const onWindowReSize$ = fromEvent(window, "resize")
  .pipe(debounceTime(300))
  .subscribe({
    next: () => {
      setTableHeight();
    },
  });

onMounted(() => {
  handleTableData();

  setTableHeight();
});

onUnmounted(() => {
  onWindowReSize$.unsubscribe();
});

/**
 * 遇到的问题
 * 1，当表格（table）和对话框（dialog）结合出现页面渲染有问题，或是table数据重复等，建议给dialog配置destroy-on-close。
 * destroy-on-close 当关闭 Dialog 时，销毁其中的元素。当出现性能问题时，可以启用此功能。
 */
</script>

<template>
  <!-- <div class="template-flex" ref="parentComponent"> -->
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
    ref="tableRef"
    :height="tableHeight"
    :table-column-arr="tableCloumnArr"
    :table-data="tableData"
    @emit-selection-change="handleSelectionChange"
    @emit-edit-operation="handleEditOperation"
    @emit-delete-operation="handleDeleteOperation"
  />

  <Pagination
    ref="paginationRef"
    :total="pagingTotal"
    :currentPage="pagingCurrentPage"
    :pageSize="pagingPageSize"
    @emit-pagination-current-change="handleCurrentChange"
    @emit-pagination-size-change="handleSizeChange"
  />

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
          :rules="addOrEditFules"
          :form-item-arr="addOrEditItemArr"
          :form-data="addOrEditData"
          :dialog-operation="dialogOperation"
        />
      </div>
    </template>
  </Dialog>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
.demo-form-inline {
}
.template-flex {
  display: flex;
  flex-direction: column;
}

:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
