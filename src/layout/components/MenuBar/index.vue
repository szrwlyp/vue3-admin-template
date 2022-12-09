<template>
  <!-- <el-menu
    :default-active="defaultActive"
    text-color="#fff"
    active-text-color="#409EFF"
    style="--el-menu-bg-color:#1f2d3d"
    :collapse="collapsed"
  > -->
  <el-menu
    active-text-color="#409EFF"
    background-color="#324157"
    :default-active="defaultActive"
    :unique-opened="true"
    class="el-menu-custom-style"
    text-color="#fff"
    :collapse="collapsed"
  >
    <menu-item :menus="menus"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute, RouteRecordName, useRouter } from "vue-router";
import MenuItem from "./MenuItem.vue";
import routerArrar from "@/router/routerArray";

const route = useRoute();
const router = useRouter();

const defaultActive = ref<RouteRecordName | null | undefined>("index");

watch(
  () => route.path,
  () => {
    defaultActive.value = route.name;
  }
);

defineProps<{
  collapsed: boolean;
}>();

onMounted(() => {
  defaultActive.value = route.name;
});

console.log(routerArrar);

const menus = routerArrar.filter((item) => item.children?.length);

// const menus = reactive([
//   {
//     path:'/',
//     name:'index',
//     redirect:'/index',
//     meta:{
//       title:'首页',
//       icon:'house'
//     },
//   },
//   {
//     path:'/order',
//     name:'Order',
//     meta:{
//       title:'订单管理',
//       icon:'Notebook',
//       roles:['admin','editor']
//     },
//     children:[
//       {
//         path:'orderQuery',
//         name:'orderQuery',
//         meta:{
//           title:'订单查询',
//           icon:'Notification'
//         }
//       },
//       {
//         path:'orderAction',
//         name:'orderAction',
//         meta:{
//           title:'订单处理',
//           icon:'Money'
//         }
//       }
//     ]
//   },
//   {
//     path:'/goods',
//     name:'Goods',
//     meta:{
//       title:'商品管理',
//       icon:'Goods',
//       roles:['admin','editor']
//     },
//     children:[
//       {
//         path:'goodsClass',
//         name:'goodsClass',
//         meta:{
//           title:'商品分类',
//           icon:'Notification'
//         }
//       },
//       {
//         path:'goodsQuery',
//         name:'goodsQuery',
//         meta:{
//           title:'商品查询',
//           icon:'Notification'
//         }
//       }
//     ]
//   },
//   {
//     path:'/system',
//     name:'System',
//     meta:{
//       title:'系统管理',
//       icon:'Goods',
//       roles:['admin','editor']
//     },
//     children:[
//       {
//         path:'systemUser',
//         name:'systemUser',
//         meta:{
//           title:'系统用户',
//           icon:'Notification'
//         }
//       },
//       {
//         path:'systemConfig',
//         name:'systemConfig',
//         meta:{
//           title:'系统配置',
//           icon:'Notification'
//         }
//       },
//       {
//         path:'systemRole',
//         name:'systemRole',
//         meta:{
//           title:'角色管理',
//           icon:'Notification'
//         }
//       },
//       {
//         path:'systemTask',
//         name:'systemTask',
//         meta:{
//           title:'定时任务',
//           icon:'Notification'
//         }
//       }
//     ]
//   },
//   {
//     path:'/essay',
//     name:'Essay',
//     meta:{
//       title:'技术杂谈',
//       icon:'Document',
//       roles:['admin','editor']
//     },
//     children:[
//       {
//         path:'RxJS',
//         name:'RxJS',
//         meta:{
//           title:'RxJS',
//           icon:'Reading'
//         },
//         children:[
//           {
//             path:'RxJSDocument',
//             name:'RxJSDocument',
//             meta:{
//               title:'RxJS文档',
//               icon:'Reading'
//             }
//           }
//         ]
//       }
//     ]
//   }
// ])
</script>
<!-- scoped -->
<style scoped lang="scss">
.el-menu-custom-style {
  // background-color: $menuBg;
  font-weight: 700;
  border: none;
}

:deep(.el-sub-menu .el-menu-item) {
  background-color: $subMenuBg;
}
:deep(.el-sub-menu .el-menu-item:hover) {
  background-color: $subMenuHover;
}
</style>
