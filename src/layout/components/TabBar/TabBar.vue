<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  Ref,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTabBarStore } from "@/stores/tabbar";
import type { Itabs } from "@/stores/storeTypes";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const tabbar = useTabBarStore();
const { set_tabsList } = storeToRefs(tabbar);

const activeKey = ref(route.path);

// tab列表
const tabsList = computed(() => {
  console.log(tabbar.getTabList());
  return tabbar.getTabList();
});

// 添加/删除tab
const addTab = () => {
  let { meta, path } = route;

  let tab: Itabs = {
    title: meta.title as string,
    path,
  };
  tabbar.addTabItem(tab);

  tabScroll(tab);
};

// 滚动tab
const tabRef = ref();
const tabListNode = ref();
const tabScroll = async (tab: Itabs) => {
  if (!tabsList.value.length) return;

  let scrollElem = tabRef.value;

  await nextTick();

  // 如果监听当前的路由存在于tabsList中则跳转到相应的tab元素。
  let isRouterSome = tabsList.value.some((item) => item.path === tab.path);
  if (isRouterSome) {
    let tabItemNode = Array.from(tabListNode.value.childNodes).find(
      (item: any) => item.id === tab.path
    ) as HTMLDivElement;

    scrollElem.scrollTo({ left: tabItemNode.offsetLeft });
  }
};

// 监听路由变化
watch(
  () => route.path,
  () => {
    console.log("aaa");
    activeKey.value = route.path;

    addTab();
  },
  { flush: "post", deep: true }
);

// 跳转tab
const clickHandle = (event: any) => {
  let { path, title } = event;
  router.push({ path });
};
// 删除当前tab
const removeCurrentTab = (targetName: string) => {
  if (tabsList.value.length === 1) return;

  // 如果删除的是当前页
  let tabFindIndex = tabsList.value.findIndex(
    (tab: Itabs) => tab.path === targetName
  );

  if (tabFindIndex !== -1 && route.path == targetName) {
    let nextTab =
      tabsList.value[tabFindIndex + 1] || tabsList.value[tabFindIndex - 1];

    if (nextTab) {
      activeKey.value = nextTab.path;
      router.push({ path: nextTab.path });
    }
  }
  tabbar.closeCurrentTab(targetName);
};

// 关闭其他（包含左，右，选中之外的tab）
const isShowDropDown = ref<boolean>(false);
type closeType = "other" | "left" | "right" | "all";
const closeOtherTabs = (closeTypes: closeType) => {
  isShowDropDown.value = false;
  if (closeTypes === "all") {
    tabbar.closeOtherTabs(closeTypes, "");
    router.push("/index");
  } else {
    tabbar.closeOtherTabs(closeTypes, activeKey.value);
  }
};

onMounted(() => {
  // 初始化页面生成tab
  addTab();
});

/**
 * 页面遇到的问题：
 * 1，当父元素有:active伪类让子元素display:none时，子元素的click事件无法触发。
 * :active样式：当用鼠标交互时，它代表的是用户按下按键和松开按键之间的时间。
 * click事件：当定点设备的按钮（通常是鼠标的主键）在一个元素上被按下和放开时，click 事件就会被触发。click 事件会在 mousedown 和 mouseup 事件依次触发后触发。
 * 原因：当执行完:active后子元素就display:none了，所以捕获不到子元素的click事件。
 * 解决方法：改用mousedown事件。
 */
</script>

<template>
  <div class="tabbar" v-show="tabsList.length">
    <div ref="tabRef" style="overflow: scroll; display: flex">
      <div class="tab" ref="tabListNode">
        <template v-for="(item, index) in tabsList" :key="index">
          <div
            class="tab-item"
            :id="item.path"
            :class="{ 'tab-item-selection': activeKey == item.path }"
            @click.self="clickHandle(item)"
          >
            {{ item.title }}
            <el-icon
              class="tab-delete"
              @click.stop="removeCurrentTab(item.path)"
              ><CloseBold
            /></el-icon>
          </div>
        </template>
      </div>
    </div>
    <div class="drop-down">
      <span class="drop-down-icon">
        <i class="box-t"></i>
        <i class="box-b"></i>
      </span>
      <ul class="context-menu">
        <li @mousedown="closeOtherTabs('all')">
          <el-icon><Close /></el-icon>
          关闭所有
        </li>
        <li @mousedown="closeOtherTabs('left')">
          <el-icon><Back /></el-icon>关闭左边
        </li>
        <li @mousedown="closeOtherTabs('right')">
          <el-icon><Right /></el-icon>关闭右边
        </li>
        <li @mousedown="closeOtherTabs('other')">
          <el-icon><Close /></el-icon>关闭其它
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-tabs--card > .el-tabs__header {
  border: none !important;
}

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

$dropDownIcon: #9a9a9a;
.tabbar {
  position: sticky;
  background-color: #eceff3;
  left: 0;
  top: 0;
  padding: 10px 0px;
  z-index: 100;
  flex: 0 1 52px;
  display: flex;
  justify-content: space-between;
}
.arrow-prev {
  position: absolute;
  cursor: pointer;
  font-size: 12px;
  height: 32px;
  display: flex;
  align-items: center;
  // top:0;
}
.left-arrow {
  left: 0;
}
.right-arrow {
  right: 0;
}
.tab {
  box-sizing: border-box;
  height: 32px;
  display: flex;
  white-space: nowrap;
  transform: translateX(0px);
  transition: transform 0.3;
  .tab-item {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    .tab-delete {
      width: 14px;
      height: 14px;
      margin-left: 4px;
      &:hover {
        border-radius: 75px;
        background: #ccc;
        color: #fff;
      }
    }
    // border:1px solid #e4e7ed;
  }
  .tab-item:last-child {
    margin-right: 0;
  }
  .tab-item-selection {
    color: $tabBarColor;
  }
}

.tabbar .el-tabs--card > .el-tabs__header {
  height: 80px !important;
}

.drop-down {
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  .drop-down-icon {
    width: 16px;
    height: 16px;
    display: inline-block;
    transition: transform 0.6s;
    .box-t {
      &::before {
        content: "";
        left: 0;
        position: absolute;
        width: 7px;
        height: 7px;
        background: $dropDownIcon;
      }
      &::after {
        content: "";
        left: 9px;
        position: absolute;
        width: 7px;
        height: 7px;
        background: $dropDownIcon;
      }
    }
    .box-b {
      &::before {
        content: "";
        top: 9px;
        left: 0;
        position: absolute;
        width: 7px;
        height: 7px;
        background: $dropDownIcon;
      }
      &::after {
        content: "";
        top: 9px;
        left: 9px;
        position: absolute;
        width: 7px;
        height: 7px;
        background: $dropDownIcon;
      }
    }
  }
  .context-menu {
    display: none;
    position: absolute;
    width: 100px;
    margin: 0;
    top: 34px;
    right: 0px;
    background: #fff;
    z-index: 9999;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
    li {
      margin: 0;
      padding: 4px 10px;
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      &:hover {
        background: #f2f2f2;
        cursor: pointer;
        color: $tabBarColor;
      }
    }
  }
  .context-menu::before {
    position: absolute;
    top: -4px;
    right: 12px;
    content: "";
    width: 0;
    height: 0;
    border: 5px solid;
    border-color: #fff #fff transparent transparent;
    transform: rotate(-45deg);
    box-shadow: 2px -2px 2px rgba(0, 0, 0, 0.2);
  }
  &:hover .drop-down-icon {
    transform: rotate(90deg);
    // $dropDownIcon: $tabBarColor !global;
    .box-t {
      &::before {
        background: $tabBarColor;
      }
      &::after {
        background: $tabBarColor;
      }
    }
    .box-b {
      &::before {
        background: $tabBarColor;
      }
      &::after {
        background: $tabBarColor;
      }
    }
  }
  &:hover .context-menu {
    display: block;
  }
  &:active .context-menu {
    // background: red;
    display: none;
  }
}
</style>
