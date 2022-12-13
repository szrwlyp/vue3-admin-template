# vue3-admin

后台管理系统通用模版

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 目录结构描述

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
