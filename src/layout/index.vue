<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import LogoBar from "./components/LogoBar/index.vue";
import MenuBar from "./components/MenuBar/index.vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import AppMain from "./components/AppMain/AppMain.vue";
import HeaderBar from "./components/HeaderBar/index.vue";
import TabBar from "./components/TabBar/TabBar.vue";

const collapsed = ref<boolean>(false);
const autoWidth = computed(() => {
  return collapsed.value ? "64px" : "200px";
});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside :style="'width:' + autoWidth" class="aside-class">
        <logo-bar :collapsed="collapsed" />
        <menu-bar :collapsed="collapsed" />
      </el-aside>
      <el-container>
        <el-header class="header-class" ref="headerRef">
          <el-row>
            <el-icon
              style="font-size: 26px; margin-right: 15px"
              @click="() => (collapsed = !collapsed)"
            >
              <component :is="collapsed ? Expand : Fold"></component>
            </el-icon>
          </el-row>
          <header-bar />
        </el-header>
        <el-main class="main" id="main">
          <tab-bar ref="tabbarRef" />
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.aside-class {
  background-color: $menuBg;
  overflow: hidden;
  transition: width 1s;
}
.header-class {
  display: flex;
  align-items: center;
  background-color: #fff;
}
.main {
  background: #eceff3;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
}
</style>
