## 目录

- [背景介绍](#背景介绍)
- [项目介绍](#项目介绍)
- [环境依赖](#环境依赖)
- [文件目录介绍](#文件目录介绍)
- [组件使用说明](#组件使用说明)

<a name="背景介绍"></a>

## 背景介绍

通常，开始一个新的后台管理系统项目，前端都需要从头开始一步一步地搭建脚手架、安装 NPM 包等等。开发新项目时每次都得重复以上步骤说实话，很麻烦。

<a name="项目介绍"></a>

## 项目介绍

此后台管理系统通用模版可用于快速搭建后台管理系统项目。内部二次封装了 Element Plus UI 库中的 form 表单组件、table 表格组件，可通过配置的形式重复、快速的搭建基本功能。使用 RxJS 实现节流，防抖，接口失败重发等基本功能。动态渲染多级菜单。

功能还在持续完善中

<a name="环境依赖"></a>

## 环境依赖

- 已安装 16.0 或更高版本的 Node.js
  <a name="文件目录介绍"></a>

## 文件目录介绍

```
├── src
│ ├── assets // 静态资源文件
│ ├── compConfig // form，table 等组件配置文件
│ ├── components // 组件文件
│ ├── composables // vue 组合式函数文件
│ ├── http // 请求类文件
│ ├── layout // side，header 等页面布局文件
│ ├── modules // 模块文件
│ ├── observable // rxjs 框架文件
│ ├── router // 路由文件
│ ├── stores // 全局状态文件
│ ├── styles // css 文件
│ ├── typings // 类型文件
│ ├── utils // 工具函数文件
│ ├── views // 视图文件
├── .env.development //测试环境配置文件
├── .env.production //生产环境配置文件
```

<a name="组件使用说明"></a>

## 组件使用说明

### Form 表单组件

```
import Form from "@/components/formComp/index.vue";

<Form
  :inline="true"
  :form-item-arr="formItemArr"
  :form-data="searchFormData"
  @emit-form-submit="handleFormSubmit"
  @emit-reset-form="handleFormReset"
/>

```

**Form 属性** <br>
| 属性名 | 说明 | 是否必须 |类型 |
| -------------- | -------- | ------------| ---------- |
| inline | 行内表单模式 | 否 | boolean |
| [form-item-arr](#form-item-arr) | form 表单 Item 配置项 | 是 | Array<Form.FormItemArrTypes> |
| form-data | 表单数据 | 是 | any |
| rules | 表单验证规则 | 否 | FormRules |
| dialogOperation | dialog 对话框类型 | 否 |"add"/"edit" |

**Form 方法** <br>
| 方法名 | 说明 |
| -------------- | -------- |
| emit-form-submit | 表单提交方法 |
| emit-reset-form | 表单重置方法 |

<a name="form-item-arr"></a>

#### form 表单 Item 配置项（form-item-arr 属性值）

```
配置项示例代码
[
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

```

**Form Item 配置项说明** <br>
| 属性名 | 说明 | 是否必须 | 类型 |
| -------------- | -------- | ---------- | ------------|
| label | 标签文本 | 否 | string |
| prop | model 的键名。 在定义了 validate、resetFields 的方法时，该属性是必填的 | 是 |string |
| model | v-model 值 | 是 |string |
| component | 当前 Item 所需组件名称 | 是 |input/select/datePicker/button/switch/checkbox/upload/cascader |
| [inputCompOptions](#inputCompOptions), [dateCompOptions](#dateCompOptions), [buttonCompOptions](#buttonCompOptions), [selectCompOptions](#selectCompOptions), [switchCompOptions](#switchCompOptions), [checkboxCompOptions](#checkboxCompOptions), uploadCompOptions, cascaderCompOptions | 对应上边 component 属性，是每个 Item 组件的配置项 | 是 |inputCompOptions, dateCompOptions, buttonCompOptions, selectCompOptions, switchCompOptions, checkboxCompOptions, uploadCompOptions, cascaderCompOptions |

<a name="inputCompOptions"></a>
**inputCompOptions（input 组件）配置参数** <br>

| 属性名               | 说明                                                                                                       | 是否必须 | 类型                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------- |
| placeholder          | 输入框占位文本                                                                                             | 是       | string                                              |
| width                | 组件宽度                                                                                                   | 否       | string                                              |
| type                 | 输入框类型                                                                                                 | 否       | string ("text"/"textarea"/"password")               |
| maxlength            | 最大输入长度                                                                                               | 否       | string/number                                       |
| inputSlot            | 插槽模式(包括复合类型插槽)                                                                                 | 否       | string                                              |
| inputSlotContent     | 插槽内容                                                                                                   | 否       | string/Array<{value: number/string;label: string}>  |
| inputKeyupEnterEvent | 键盘回车事件                                                                                               | 否       | "emitSubmitButton"                                  |
| size                 | 输入框尺寸。只在 type 不为 'textarea' 时有效。                                                             | 否       | string                                              |
| autosize             | textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 } | 否       | boolean/object ({minRows: number;maxRows: number;}) |
| showWordLimit        | 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效                                             | 否       | boolean                                             |

<a name="dateCompOptions"></a>

**DateCompOptions（date 组件）配置参数**

| 属性名           | 说明                                                                                       | 是否必须 | 类型                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------- |
| placeholder      | 输入框占位文本                                                                             | 是       | string                                                                                               |
| width            | 组件宽度                                                                                   | 否       | string                                                                                               |
| type             | 输入框类型                                                                                 | 否       | string ("year"/"month"/ "date"/"dates"/"datetime"/ "week"/"datetimerange"/ "daterange"/"monthrange") |
| format           | 输入框格式                                                                                 | 否       | string                                                                                               |
| valueFormat      | 绑定值的格式,不指定则绑定值为 Date 对象                                                    | 是       | string                                                                                               |
| startPlaceholder | 范围选择时开始日期的占位内容                                                               | 否       | string                                                                                               |
| endPlaceholder   | 范围选择时结束日期的占位内容                                                               | 否       | string                                                                                               |
| shortcuts        | 设置快捷选项，需要传入数组对象                                                             | 否       | Array<{ text: string; value: Date/Function/Array<Date> }>                                            |
| disabledDate     | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 | 否       | Function                                                                                             |

<a name="buttonCompOptions"></a>

**buttonCompOptions（button 组件）配置参数**

| 属性名    | 说明     | 是否必须 | 类型                                   |
| --------- | -------- | -------- | -------------------------------------- |
| buttonArr | 按钮数组 | 是       | Array<[ButtonOptions](#ButtonOptions)> |

<a name='ButtonOptions'></a>

**ButtonOptions 参数**
| 属性名 | 说明 | 是否必须 | 类型 |
| -------------- | -------- | ----------- | ---------- |
| buttonText | 按钮文本 | 否 | string |
| width | 按钮宽度 | 否 | string |
| emitEvent | 按钮事件 | 是 | "emitSubmitButton"/"emitResetButton" |
| size | 按钮尺寸 | 否 | "large"/"small" |
| type | 按钮类型 | 否 | "primary"/"success"/ "info"/"warning"/"danger" |
| plain | 是否为朴素按钮 | 否 | boolean |
| text | 是否为文字按钮 | 否 | boolean |
| bg | 是否显示文字按钮背景颜色 | 否 | boolean |
| link | 是否为链接按钮 | 否 | boolean |
| round | 是否为圆角按钮 | 否 | boolean |
| circle | 是否为圆形按钮 | 否 | boolean |
| loading | 是否为加载中状态 | 否 | boolean |
| loadingIcon | 自定义加载中状态图标组件 | 否 | boolean |
| disabled | 按钮是否为禁用状态 | 否 | boolean |
| icon | 按钮图标组件 | 否 | string |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | 否 | boolean |
| color | 自定义按钮颜色, 并自动计算 hover 和 active 触发后的颜色 | 否 | string |

<a name='selectCompOptions'></a>

**selectCompOptions（select 组件）配置参数**

| 属性名      | 说明           | 是否必须 | 类型                                         |
| ----------- | -------------- | -------- | -------------------------------------------- |
| placeholder | 输入框占位文本 | 是       | string                                       |
| width       | 组件宽度       | 否       | string                                       |
| selectList  | 下拉框数据     | 是       | Array<{value: number/string;label: string;}> |

<a name="switchCompOptions"></a>

**switchCompOptions（switch 组件）配置参数**

| 属性名         | 说明             | 是否必须 | 类型                      |
| -------------- | ---------------- | -------- | ------------------------- |
| switchOnColor  | 开关打开时的颜色 | 否       | string                    |
| switchOffColor | 开关关闭时的颜色 | 否       | string                    |
| size           | 开关大小         | 否       | "large"/"small"/"default" |

<a name="checkboxCompOptions"></a>

**checkboxCompOptions（checkbox 组件）配置参数**

| 属性名      | 说明       | 是否必须 | 类型                |
| ----------- | ---------- | -------- | ------------------- |
| width       | 组件宽度   | 否       | string              |
| checkboxArr | 多选框数组 | 否       | Array<CheckboxType> |

###### CheckboxType

| 属性名   | 说明       | 是否必须 | 类型          |
| -------- | ---------- | -------- | ------------- |
| label    | 多选框文本 | 是       | string        |
| disabled | 是否禁用   | 否       | boolean       |
| value    | 多选框值   | 是       | number/string |

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
