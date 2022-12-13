import type {
  formItemArrTypes,
  SearchType,
  dialogHandleType,
} from "@/types/elementPlusTypes";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

/**
 * 表格列数据标题配置
 */
export const tableCloumnConfigArr: Array<TableCloumnArrTypes> = [
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
];

/**
 * 表单项目配置
 */
export const formItemConfigArr: Array<formItemArrTypes> = [
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
