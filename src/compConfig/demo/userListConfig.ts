import { ref } from "vue";

/**
 * 表格列数据标题配置
 */
export const tableCloumnConfigArr: Array<Table.TableCloumnArrTypes> = [
  {
    type: "selection",
    align: "center",
    width: "50px",
  },
  {
    type: "index",
    align: "center",
    label: "序号",
    width: "60px",
  },
  {
    prop: "user_name",
    label: "用户名称",
    align: "center",
    // fixed: "left",
  },
  {
    prop: "age",
    label: "年龄",
    align: "center",
  },
  {
    prop: "address",
    label: "地址",
    align: "center",
  },
  {
    prop: "",
    label: "操作",
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
];
export const formItemConfigArr = [];
export const addOrEditItemConfigArr: Array<Form.FormItemArrTypes> = [
  {
    label: "ID",
    prop: "id",
    model: "id",
    component: "input",
    disableEditData: true,
    inputCompOptions: {
      placeholder: "请输入随机ID",
      width: "300px",
      type: "text",
    },
    rules: [
      {
        type: "string",
        required: true,
        message: "请填写随机ID",
        trigger: "blur",
      },
    ],
  },
  {
    label: "用户名称",
    prop: "user_name",
    model: "user_name",
    component: "input",
    disableEditData: true,
    inputCompOptions: {
      placeholder: "请输入用户名称",
      width: "300px",
      type: "text",
    },
    rules: [
      {
        type: "string",
        required: true,
        message: "请输入用户名称",
        trigger: "blur",
      },
    ],
  },
  {
    label: "年龄",
    prop: "age",
    model: "age",
    component: "input",
    disableEditData: true,
    inputCompOptions: {
      placeholder: "请输入年龄",
      width: "300px",
      type: "text",
    },
    rules: [
      {
        type: "string",
        required: true,
        message: "请输入年龄",
        trigger: "blur",
      },
    ],
  },
  {
    label: "详细地址",
    prop: "address",
    model: "address",
    component: "input",
    disableEditData: true,
    inputCompOptions: {
      placeholder: "请输入详细地址",
      width: "300px",
      type: "textarea",
      autosize: { minRows: 2, maxRows: 4 },
      maxlength: 30,
      showWordLimit: true,
    },
    rules: [
      {
        type: "string",
        required: true,
        message: "请输入详细地址",
        trigger: "blur",
      },
    ],
  },
];
/**
 * 表格配置
 */
export const tableConfig = {};
/**
 * 组合式函数参数
 */
export const composableParams = {
  queryParam: ref({
    name: "",
    type: "",
    deviceid: "",
  }),
  url: {
    list: "/magic/test/getTestUserList",
    delete: "/magic/test/delete",
    add: "/magic/test/add",
    edit: "/magic/test/edit",
  },
};
