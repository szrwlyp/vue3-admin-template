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
│ ├── types // 类型文件
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
| 属性名 | 说明 | 类型 |
| -------------- | -------- | ---------- |
| inline | 行内表单模式 | boolean |
| form-item-arr | form 表单 Item 配置项 | Array<Form.FormItemArrTypes> |
| form-data | 表单数据 | any |
| rules | 表单验证规则 | FormRules |
| labelWidth | label 的宽度 | string/number |
| dialogOperation | dialog 对话框类型（add,edit） | "add"/"edit" |

**Form 方法** <br>
| 方法名 | 说明 |
| -------------- | -------- |
| emit-form-submit | 表单提交方法 |
| emit-reset-form | 表单重置方法 |

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
