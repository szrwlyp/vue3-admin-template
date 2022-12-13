import type {
  FormItemArrTypes,
  SearchType,
  DialogHandleType,
  TableCloumnArrTypes,
  TableConfig,
} from "@/types/elementPlusTypes";

/**
 * 表格列数据标题配置
 */
export const tableCloumnConfigArr: Array<TableCloumnArrTypes> = [
  {
    prop: "openid",
    label: "openid",
    align: "center",
    // fixed: "left",
  },
  {
    prop: "headUrl",
    label: "用户头像",
    isChange: true,
    component: "imageFormat",
    align: "center",
  },
  {
    prop: "name",
    label: "用户昵称",
    align: "center",
  },
  {
    prop: "type",
    label: "操作类型",
    isChange: true,
    component: "typeFormat",
    align: "center",
  },
  {
    prop: "duration",
    label: "访问时长",
    align: "center",
  },
  {
    prop: "time",
    label: "访问时间",
    isChange: true,
    component: "dateFormat",
    align: "center",
  },
  {
    prop: "page",
    label: "访问页面",
    align: "center",
  },
  {
    prop: "province",
    label: "访问地区",
    align: "center",
    // children: [
    //   {
    //     prop: "province",
    //     label: "省",
    //     align: "center",
    //   },
    //   {
    //     prop: "city",
    //     label: "市",
    //     align: "center",
    //   },
    //   {
    //     prop: "region",
    //     label: "区",
    //     align: "center",
    //   },
    // ],
  },
  {
    prop: "log",
    label: "日志",
    align: "center",
  },
];

/**
 * 表单项目配置
 */
export const formItemConfigArr: Array<FormItemArrTypes> = [
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
];

/**
 * 表单，表格类型格式
 */
export const searchFormTypeConfig: Array<SearchType> = [
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

/**
 * 表格配置
 */
export const tableConfig: TableConfig = {
  stripe: false,
  headerCellStyle: {
    background: "#eceff3",
    color: "#000000",
  },
  // headerRowClassName: "aaa",
  // headerRowStyle: { background: "#eceff3", color: "#000000" },
  highlightCurrentRow: false,
  tableLayout: "fixed",
  // border: true,
  rowClassName: ({ row, rowIndex }: { row: any; rowIndex: number }) => {
    switch (rowIndex) {
      case 1:
        return "warning-row";
      case 3:
        return "success-row";
      case 5:
        return "danger-row";
      case 7:
        return "info-row";
      default:
        return "";
    }
  },
};
