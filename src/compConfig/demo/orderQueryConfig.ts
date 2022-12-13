import type {
  FormItemArrTypes,
  SearchType,
  DialogHandleType,
  TableCloumnArrTypes,
} from "@/types/elementPlusTypes";
import type { FormRules } from "element-plus";

export const searchFormTypeConfig: Array<SearchType> = [
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

/**
 * 查询表单选项配置
 */
export const formItemConfigArr: Array<FormItemArrTypes> = [
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
];

/**
 * 表格列数据标题配置
 */
export const tableCloumnConfigArr: Array<TableCloumnArrTypes> = [
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
];

/**
 * 表格数据新增或修改
 */
export const addOrEditItemConfigArr: Array<FormItemArrTypes> = [
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
    label: "商品分类",
    prop: "goods_class",
    model: "goods_class",
    component: "cascader",
    // disableEditData: true,
    cascaderCompOptions: {
      width: "300px",
      placeholder: "请输入商品分类",
      cascaderProps: { expandTrigger: "hover" },
      clearable: true,
      // showAllLevels: false,
      filterable: true,
      // emitChangeEvent: "emitChange",
      // emitExpandChangeEvent: "emitExpandChange",
      options: [
        {
          value: "guide",
          label: "Guide",
          children: [
            {
              value: "disciplines",
              label: "Disciplines",
              // disabled: true,
              children: [
                {
                  value: "consistency",
                  label: "Consistency",
                },
                {
                  value: "feedback",
                  label: "Feedback",
                },
                {
                  value: "efficiency",
                  label: "Efficiency",
                },
                {
                  value: "controllability",
                  label: "Controllability",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "side nav",
                  label: "Side Navigation",
                },
                {
                  value: "top nav",
                  label: "Top Navigation",
                },
              ],
            },
          ],
        },
      ],
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
];

/**
 * 表单验证
 */
export const addOrEditFulesConfig: FormRules = {
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
};
