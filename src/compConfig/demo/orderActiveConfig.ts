import { reactive, ref } from "vue";

/**
 * 表单，表格类型格式
 */
export const searchFormTypeConfig: Array<Form.SearchType> = [
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
    prop: "openid",
    label: "openid",
    align: "center",
    // fixed: "left",
  },
  {
    prop: "headUrl",
    label: "用户头像",
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
    component: "typeFormat",
    align: "center",
    compOptions: {
      columnTypeArr: searchFormTypeConfig,
    },
  },
  {
    prop: "duration",
    label: "访问时长",
    align: "center",
  },
  {
    prop: "time",
    label: "访问时间",
    component: "dateFormat",
    align: "center",
  },
  {
    prop: "page",
    label: "访问页面",
    align: "center",
  },
  {
    label: "配送信息",
    align: "center",
    children: [
      {
        label: "全国",
        align: "center",
        children: [
          {
            prop: "province",
            label: "省",
            align: "center",
          },
          {
            prop: "city",
            label: "市",
            align: "center",
          },
          {
            prop: "region",
            label: "区",
            align: "center",
          },
        ],
      },
      {
        label: "备注",
        align: "center",
      },
    ],
  },
  {
    prop: "log",
    label: "日志",
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

/**
 * 表单项目配置
 */
export const formItemConfigArr: Array<Form.FormItemArrTypes> = [
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
      selectList: searchFormTypeConfig,
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
 * 表格配置
 */
export const tableConfig: Table.TableConfig = {
  stripe: false,
  headerCellStyle: {
    background: "#f5f7fa",
    color: "#000000",
  },
  showSummary: true,
  sumText: "总计1",
  // headerRowClassName: "aaa",
  // headerRowStyle: { background: "#eceff3", color: "#000000" },
  highlightCurrentRow: false,
  tableLayout: "fixed",
  // border: true,
  summaryMethod: (param: any) => {
    const { columns, data } = param,
      includeArr = ["duration"];

    if (!columns.length || !data.length) {
      return 0;
    }

    const sums: string[] = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "总计1";
        return;
      }

      const values = data.map((item: any) => Number(item[column.property]));
      if (
        !values.every((value: any) => Number.isNaN(value)) &&
        includeArr.includes(column.property)
      ) {
        sums[index] = `$ ${values.reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0)}`;
      } else {
        sums[index] = "N/A";
      }
    });
    return sums;
  },
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
    list: "/adm/dataStatsService/getWxAccessLogs",
    delete: "",
    add: "",
    edit: "",
  },
};
