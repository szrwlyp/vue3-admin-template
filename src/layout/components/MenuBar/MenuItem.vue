<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps<{
  menus: Array<any>;
}>();
// console.warn("menu", props.menus);
const router = useRouter();
const toPath = (item: string) => {
  router.push({ name: item });
};
</script>

<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu
      v-if="menu.meta.showChildren && menu.children && menu.children.length"
      :index="menu.name"
    >
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item
        :menus="menu.children"
        v-if="menu?.children?.length"
      ></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.name" @click="toPath(menu.name)">
      <el-icon>
        <component :is="menu.meta.icon" />
      </el-icon>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
// .el-menu{
//   background-color: $subMenuBg !important;
// }
</style>
