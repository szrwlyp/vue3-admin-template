import Layout from "@/layout/index.vue";
const routerArrar = [
  {
    path: "/login",
    meta: {
      title: "用户登录",
    },
    component: () => import("@/views/userLogin.vue"),
  },
  {
    path: "/",
    redirect: "/index",
    name: "Index",
    component: Layout,
    meta: {
      title: "首页",
      icon: "house",
      showChildren: false,
      roles: ["admin", "ordinary"],
    },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "首页",
          icon: "house",
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/demo",
    name: "Demo",
    redirect: "/demo/order",
    component: Layout,
    meta: {
      title: "demo",
      icon: "Notification",
      showChildren: true,
    },
    children: [
      {
        path: "order",
        redirect: "/demo/order/orderQuery",
        name: "Order",
        meta: {
          title: "订单管理",
          icon: "Notification",
          showChildren: true,
        },
        children: [
          {
            path: "orderQuery",
            name: "orderQuery",
            component: () => import("@/views/demo/order/orderQuery.vue"),
            meta: {
              title: "订单查询",
              icon: "Notification",
              requiresAuth: true,
            },
          },
          {
            path: "orderAction",
            name: "orderAction",
            component: () => import("@/views/demo/order/orderAction.vue"),
            meta: {
              title: "订单处理",
              icon: "Money",
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "goods",
        redirect: "/demo/goods/goodsClass",
        name: "Goods",
        meta: {
          title: "商品管理",
          icon: "Goods",
          showChildren: true,
        },
        children: [
          {
            path: "goodsClass",
            name: "goodsClass",
            component: () => import("@/views/demo/goods/goodsClass.vue"),
            meta: {
              title: "商品分类",
              icon: "Notification",
              requiresAuth: true,
            },
          },
          {
            path: "goodsQuery",
            name: "goodsQuery",
            component: () => import("@/views/demo/goods/goodsQuery.vue"),
            meta: {
              title: "商品查询",
              icon: "Money",
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "system",
        redirect: "/demo/system/systemUser",
        name: "System",
        meta: {
          title: "系统管理",
          icon: "Goods",
          showChildren: true,
        },
        children: [
          {
            path: "systemUser",
            name: "systemUser",
            component: () => import("@/views/demo/system/system_user.vue"),
            meta: {
              title: "系统用户",
              icon: "Money",
              requiresAuth: true,
            },
          },
          {
            path: "systemConfig",
            name: "systemConfig",
            component: () => import("@/views/demo/system/system_config.vue"),
            meta: {
              title: "系统配置",
              icon: "Notification",
              requiresAuth: true,
            },
          },
          {
            path: "systemRole",
            name: "systemRole",
            component: () => import("@/views/demo/system/system_role.vue"),
            meta: {
              title: "角色管理",
              icon: "Notification",
              requiresAuth: true,
            },
          },
          {
            path: "systemTask",
            name: "systemTask",
            component: () => import("@/views/demo/system/task.vue"),
            meta: {
              title: "定时任务",
              icon: "Notification",
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "essay",
        redirect: "/demo/essay/RxJS",
        name: "Essay",
        meta: {
          title: "技术杂谈",
          icon: "Document",
          showChildren: true,
        },
        children: [
          {
            path: "RxJS",
            name: "RxJS",
            redirect: "/demo/essay/RxJS/RxJSDocument",
            meta: {
              title: "RxJS",
              icon: "Reading",
              showChildren: true,
            },
            children: [
              {
                path: "RxJSDocument",
                name: "RxJSDocument",
                component: () => import("@/views/demo/essay/rxjs/index.vue"),
                meta: {
                  title: "RxJS文档",
                  icon: "Reading",
                  requiresAuth: true,
                },
              },
              {
                path: "RxJSCase",
                name: "RxJSCase",
                component: () => import("@/views/demo/essay/rxjs/case.vue"),
                meta: {
                  title: "RxJS案例",
                  icon: "Reading",
                  requiresAuth: true,
                },
              },
            ],
          },
        ],
      },
      {
        path: "css",
        redirect: "/demo/css/goodsClass",
        name: "css",
        meta: {
          title: "Css模块",
          icon: "Goods",
          showChildren: true,
        },
        children: [
          {
            path: "cssDemo1",
            name: "cssDemo1",
            component: () => import("@/views/demo/css/cssDemo1.vue"),
            meta: {
              title: "cssDemo1",
              icon: "Notification",
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
];

export default routerArrar;
