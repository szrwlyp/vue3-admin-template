import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import routerArrar from "./routerArray";
import { useUserInfoStore } from "@/stores/userInfo";
import { storeToRefs } from "pinia";

const routes: Array<RouteRecordRaw> = routerArrar;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全局守卫
router.beforeEach((to, from, next) => {
  const userInfoStore = useUserInfoStore();
  const { set_sessionIdStore } = storeToRefs(userInfoStore);

  document.title = (to.meta.title as string) ?? "vue3-admin";

  console.warn("登录验证：", to.meta, set_sessionIdStore.value);
  // 此路由需要授权并检查是否已登录
  // 如果没有，则重定向到登录页面
  if (to.meta.requiresAuth && !set_sessionIdStore.value) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
