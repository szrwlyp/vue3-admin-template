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
import {
  of,
  skip,
  take,
  toArray,
  map,
  bufferCount,
  tap,
  concatMap,
  delay,
  mergeMap,
  filter,
} from "rxjs";
import { Delete, Plus } from "@element-plus/icons-vue";
import Table from "@/components/tableComp/index.vue";
import Form from "@/components/formComp/index.vue";
import Divider from "@/components/dividerComp.vue";
import Dialog from "@/components/dialogComp/index.vue";
import { orderData } from "./data";
import {
  mainScrollTop,
  resetData,
  deepClone,
  randomRange,
  str2Uint8Array,
  ab2str,
  sleep,
} from "@/utils/index";
import { u_ElMessageBoxConfig, u_ElMessage } from "@/utils/elementPlus";
import { useOrderDataStore } from "@/stores/orderData";
import { storeToRefs } from "pinia";
import {
  searchFormTypeConfig,
  formItemConfigArr,
  tableCloumnConfigArr,
  addOrEditItemConfigArr,
  tableConfig,
} from "@/compConfig/demo/orderQueryConfig";

const orderDataStore = useOrderDataStore();

const { set_orderData } = storeToRefs(orderDataStore);

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
const formItemArr = reactive(formItemConfigArr);
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

const tableRef = ref();

const tableCloumnArr = reactive(tableCloumnConfigArr);

const tableConfigOptions = reactive(tableConfig);

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
  total: set_orderData.value.length ?? 0,
  currentPage: 1,
  pageSize: 10,
});
// 当前分页改变
const handleCurrentChange = (val: number) => {
  pagination.value.currentPage = val;
  handleTableData();
  mainScrollTop();
};

// 当前分页数据条数改变
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;

  handleTableData();
  mainScrollTop();
};

// 模拟后端接口实现分页，条数
const handleTableData = () => {
  let currentPage = pagination.value.currentPage,
    pageSize = pagination.value.pageSize;

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
const dialogOperation = ref<Form.DialogHandleType>();
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
  goods_class: Array<any>;
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
  goods_class: ["guide", "disciplines", "consistency"],
});

// 需要添加或修改的item
const addOrEditItemArr = reactive(addOrEditItemConfigArr);

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

onMounted(() => {
  handleTableData();

  let menuList = [
    {
      id: 1,
      pid: 0,
      title: "控制台",
      code: "deskboard",
    },
    {
      id: 2,
      pid: 0,
      title: "用户管理",
      code: "user",
    },
    {
      id: 3,
      pid: 2,
      title: "用户列表",
      code: "list",
    },
    {
      id: 4,
      pid: 3,
      title: "查看",
      code: "view",
    },
    {
      id: 5,
      pid: 3,
      title: "删除",
      code: "delete",
    },
    {
      id: 6,
      pid: 0,
      title: "系统设置",
      code: "system",
    },
    {
      id: 7,
      pid: 6,
      title: "日志管理",
      code: "logs",
    },
  ];

  of(...menuList)
    .pipe(
      filter((item) => {
        return item.pid == 0;
      }),
      mergeMap((fItem: any) => {
        console.log(fItem);
        fItem.children = [];
        return of(...menuList).pipe(filter((item) => item.pid === fItem.id));
      }),
      tap((x) => console.warn(x))
    )
    .subscribe();
});

onUnmounted(() => {});

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
    :inline="true"
    :form-item-arr="formItemArr"
    :form-data="searchFormData"
    @emit-form-submit="handleFormSubmit"
    @emit-reset-form="handleFormReset"
  />

  <!-- 分割线 -->
  <Divider />

  <!-- 数据操作 -->
  <el-row class="mb-4" style="padding: 18px 0 10px 0">
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
    :table-column-arr="tableCloumnArr"
    :table-data="tableData"
    :table-options="tableConfigOptions"
    :pagination="pagination"
    @emit-selection-change="handleSelectionChange"
    @emit-edit-operation="handleEditOperation"
    @emit-delete-operation="handleDeleteOperation"
    @emit-pagination-current-change="handleCurrentChange"
    @emit-pagination-size-change="handleSizeChange"
  >
    <template #expand="{ expandData }">
      <div style="margin-left: 100px">
        <p>订单ID：{{ expandData.order_id }}</p>
        <p>商品名称：{{ expandData.goods_name }}</p>
        <p>收货人：{{ expandData.user_name }}</p>
        <p>收货地址：{{ expandData.address }}</p>
      </div>
    </template>
  </Table>

  <!-- 目标元素必须在安装组件之前存在-即，目标不能由组件本身呈现，理想情况下应该位于整个Vue组件树之外。 -->
  <!-- <teleport to="#expand">
    <div>将本元素传送到expand</div>
  </teleport> -->
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
          :form-data="addOrEditData"
          :dialog-operation="dialogOperation"
        />
      </div>
    </template>
  </Dialog>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
.template-flex {
  display: flex;
  flex-direction: column;
}

:deep(.el-input__wrapper) {
  width: 100%;
}
</style>
