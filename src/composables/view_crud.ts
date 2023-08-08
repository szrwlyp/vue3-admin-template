import { ref, onMounted, toRefs } from "vue";
import { getTableRequest, addActive } from "@/modules/crud";

import {
  mainScrollTop,
  resetData,
  deepClone,
  randomRange,
  str2Uint8Array,
  ab2str,
  sleep,
} from "@/utils/index";
import {
  u_ElMessageBoxConfig,
  u_ElMessage,
  tableLoadingInstance,
  tableLoading,
} from "@/utils/elementPlus";

interface Params {
  queryParam: any;
  dialogFormData: any;
  url: { list: string; add: string; delete: string; edit: string };
}
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
export function useCURD(params: Params) {
  const { queryParam, url, dialogFormData } = toRefs(params);

  /************************************ Form 表单 ***********************************/
  // 提交查询
  const handleFormSubmit = () => {
    pagination.value.currentPage = 1;
    getTableData();
  };

  // 表单重置
  const handleFormReset = () => {
    pagination.value.currentPage = 1;
    getTableData();
  };

  /************************************ 数据操作按钮 ***********************************/

  // 是否禁用批量删除按钮
  const isDisabledBatchDelete = ref<boolean>(true);
  // 删除
  const handleDeleteOperation = (index?: number, row?: any) => {
    console.log(row);

    if (row && !batchSelectionData.value.length) {
      batchSelectionData.value.push(row);
    }
    console.log(batchSelectionData.value);

    u_ElMessageBoxConfig(
      "删除",
      `是否${
        isDisabledBatchDelete.value ? "删除该数据" : "批量删除选中的内容"
      }?`,
      "Delete",
      "error"
    )
      .then(() => {
        // orderDataStore.deleteOrderData(batchSelectionData.value);
        u_ElMessage({ type: "success", message: "删除成功！" });
        getTableData();
      })
      .catch(() => {
        // u_ElMessage("error", "删除失败！");
      });
  };

  // 编辑
  const handleEditOperation = (index: number, row: any) => {
    console.log(row);
  };

  // 添加
  const handleAddOperation = () => {
    dialogVisible.value = true;
    dialogOperation.value = "add";
  };

  /************************************** Table ******************************/
  // 表格数据
  const tableData = ref<Array<any>>([]);

  // 拼接请求参数
  const getQueryParams = () => {
    const params = Object.assign(
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
      queryParam.value
    );
    return params;
  };

  // 获取表格数据
  const getTableData = () => {
    const params = getQueryParams();
    console.log(params);

    tableLoading({
      text: "数据加载中...",
      background: "rgba(255, 255, 255, 0.9)",
    });

    getTableRequest({
      data: params,
      url: url.value.list,
    }).subscribe({
      next: (res) => {
        console.log(res);
        const { code, data } = res;
        tableData.value = data?.list ?? [];
        pagination.value.total = data?.total ?? 0;
        mainScrollTop();
        tableLoadingInstance?.close();
      },
      error: (error) => {
        console.log(error);
        tableLoadingInstance?.close();
      },
    });
  };

  // 处理表格选中的数据行
  const batchSelectionData = ref<Array<any>>([]);
  const handleSelectionChange = (val: any) => {
    console.log(val);
    batchSelectionData.value = val;
    isDisabledBatchDelete.value = val.length >= 2 ? false : true;
  };

  /************************************* 分页 ********************************/
  // 分页参数
  const pagination = ref<Pagination>({
    total: 0,
    currentPage: 1,
    pageSize: 10,
  });
  // 当前分页改变
  const handleCurrentChange = (val: number) => {
    pagination.value.currentPage = val;
    getTableData();
  };

  // 当前分页数据条数改变
  const handleSizeChange = (val: number) => {
    pagination.value.pageSize = val;
    getTableData();
  };

  /***************************************** dialog对话框 **************************************/
  const dialogVisible = ref(false);
  const dialogOperation = ref<Form.DialogHandleType>();
  const dialogFormRef = ref();
  const handleDialogCancel = () => {
    // 对话框关闭移除校验结果
    dialogFormRef.value.ruleFormRef.resetFields();

    const dataObj = deepClone(dialogFormData.value);
    dialogFormData.value = resetData(dataObj);

    dialogVisible.value = false;
  };

  const handleDialogConfirm = async () => {
    await dialogFormRef.value.ruleFormRef.validate(
      (valid: boolean, fields: any) => {
        if (valid) {
          console.log("submit!");
          console.log(dialogFormData.value);

          console.log(dialogOperation.value);
          if (dialogOperation.value === "add") {
            handleAdd();
          } else {
            // orderDataStore.editOrderData(addOrEditData.value);
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

  const handleAdd = () => {
    addActive({ data: dialogFormData.value, url: url.value.add }).subscribe({
      next: (res) => {
        console.log(res);

        const { code, data } = res;
        if (code != 1) {
          u_ElMessage({ type: "error", message: "添加失败！" });
          return;
        }

        u_ElMessage({ type: "success", message: "添加成功！" });
        dialogVisible.value = false;
        getTableData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  onMounted(() => {
    getTableData();
  });

  return {
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
  };
}
