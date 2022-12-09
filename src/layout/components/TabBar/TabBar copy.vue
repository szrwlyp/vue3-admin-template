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
import { fromEvent, map, debounceTime, from, tap } from "rxjs";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const tabbar = useTabBarStore();
const { set_tabsList, set_contextMenuTabId } = storeToRefs(tabbar);

const activeKey = ref("");

// tab列表
const tabsList = computed(() => {
  return tabbar.getTabList();
});

// 添加tab
const addTab = () => {
  let { meta, path } = route;
  let tab: Itabs = {
    title: meta.title as string,
    path,
  };
  tabbar.addTabItem(tab);
  // store.commit("addTabs", tab);
};

// 监听路由变化
watch(
  () => route.path,
  () => {
    activeKey.value = route.path;
    addTab();
  }
);

// 跳转tab
const clickHandle = (event: any) => {
  let { path, title } = event;
  router.push({ path });
};
// 删除tab
const removeTab = (targetName: string) => {
  if (tabsList.value.length === 1) return;

  contextMenuVisible.value = false;

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
  // store.commit("closeCurrentTab", targetName);
};

onMounted(() => {
  // 初始化页面生成tab
  addTab();

  // rxjs监听窗口改变事件
  onWindowReSize$;
});

// 右键显示菜单列表
const contextMenuVisible: Ref<boolean> = ref(false);
const left = ref("");
const top = ref("");
const openContextMenu = (event: any) => {
  console.log(event);
  let {
    clientX,
    clientY,
    layerX,
    target: { id, offsetLeft, offsetHeight, offsetWidth, clientWidth },
  } = event;
  console.log(layerX);
  console.log(offsetLeft - scrollTotal.value);
  console.log(offsetWidth);
  if (id) {
    let currentContextTabId = id;
    contextMenuVisible.value = true;
    left.value = `${layerX}px`;
    top.value = `${offsetHeight + 10}px`;

    tabbar.saveCurContextTabId(currentContextTabId);
    // store.commit("saveCurContextTabId", currentContextTabId);
  }
};

// 关闭全部tab
const closeAllTabs = () => {
  tabbar.$reset();
  // store.commit("closeAllTabs");
  router.push("/index");
  if (route.path == "/index") {
    addTab();
  }
};

// 关闭其他（包含左，右，选中之外的tab）
const closeOtherTabs = (par: string) => {
  console.log(par);
  tabbar.closeOtherTabs(par);
  // store.commit("closeOtherTabs", par);

  console.log(tabsList.value);

  let contextMenuTabId = set_contextMenuTabId.value;
  activeKey.value = contextMenuTabId;
  router.push({ path: contextMenuTabId });
};

watch(
  () => contextMenuVisible.value,
  () => {
    if (contextMenuVisible.value) {
      window.addEventListener(
        "click",
        () => (contextMenuVisible.value = false)
      );
    } else {
      window.removeEventListener(
        "click",
        () => (contextMenuVisible.value = false)
      );
    }
  }
);

// 监听窗口改变展示tab左右箭头
const w = window.innerWidth;
const onWindowReSize$ = fromEvent(window, "resize")
  .pipe(
    debounceTime(100),
    tap((e) => {
      console.log("窗口事件", e);
      console.log(window.innerWidth - w);
      console.log(scrollTotal.value);
      console.log(-Math.abs(scrollTotal.value) - (window.innerWidth - w));
      // scrollTotal.value = -(Math.abs(scrollTotal.value) - (window.innerWidth-w))
      // tabTransFrom.value = `translateX(${(scrollTotal.value)}px)`
    })
  )
  .subscribe((n) => isShowTabArrow());

// 是否滚动tab
const isScrollLable = ref<boolean>(false);
const tabRef = ref();
watch(
  () => tabsList.value,
  async (newVal) => {
    if (newVal.length < 1) return;

    await nextTick();

    if (tabRef.value) {
      isShowTabArrow();
    }
  },
  { deep: true }
);

// 动态展示tab的左右箭头
const isShowTabArrow = async () => {
  let { clientWidth = 0 } = tabRef.value;
  let classTabNode: any = Array.from(tabRef.value.childNodes).find(
    (item: any) => item.className
  );

  if (classTabNode.offsetWidth + classTabNode.offsetLeft > clientWidth) {
    isScrollLable.value = true;
    console.log("aaa");
    // await nextTick()
    // leftRightHandle('right')
  } else {
    isScrollLable.value = false;
  }
};

// 点击滚动tab
const tabTransFrom = ref<string>("translateX(0px)");

// 当前滑动的index
const cur_scroll_index = ref<number>(1);

const scrollTotal = ref<number>(0);

const leftRightHandle = (handleStr: string) => {
  // 可视区域的宽度
  let visualClientWidth = tabRef.value.clientWidth;

  // tab个数的总宽度
  let tabsTotalWidth = tabRef.value.childNodes[0].clientWidth;

  // 可视区域之外的tab数宽度
  let tabsHiddenWidth = tabsTotalWidth - visualClientWidth;

  // 算出tab总数宽度占可视区域的几份
  let proportion =
    Math.round((tabsTotalWidth / visualClientWidth) * 10000) / 10000;
  // let proportion = Math.abs(tabsTotalWidth/visualClientWidth)

  // proportion 小数部分占可视窗口的宽度
  let surplusWidth = Math.floor(
    Math.abs(visualClientWidth * (proportion - cur_scroll_index.value))
  );

  if (handleStr == "right") {
    let test = Math.floor((proportion - ~~proportion) * visualClientWidth);
    if (Math.abs(scrollTotal.value) + test > tabsHiddenWidth) return;

    if (proportion - cur_scroll_index.value > 1) {
      // 整数部分等于一个可视窗口的宽度
      scrollTotal.value = Math.round(scrollTotal.value - visualClientWidth);
      tabTransFrom.value = `translateX(${scrollTotal.value}px)`;
      cur_scroll_index.value = cur_scroll_index.value + 1;
    } else {
      // 小数部分就等于剩余的宽度（不满一个可视窗口的宽度）
      let scrollTotalNum = Math.floor(Math.abs(scrollTotal.value));

      if (surplusWidth === scrollTotalNum) {
        scrollTotal.value = Math.round(scrollTotal.value - visualClientWidth);
      } else {
        scrollTotal.value = Math.round(scrollTotal.value - surplusWidth);
      }

      tabTransFrom.value = `translateX(${scrollTotal.value}px)`;
      cur_scroll_index.value = 1;
    }
  }

  if (handleStr == "left") {
    if (scrollTotal.value >= 0) return;

    if (proportion - cur_scroll_index.value > 1) {
      scrollTotal.value = Math.round(scrollTotal.value + visualClientWidth);
      tabTransFrom.value = `translateX(${scrollTotal.value}px)`;
      cur_scroll_index.value = cur_scroll_index.value + 1;
    } else {
      let scrollTotalNum = Math.round(Math.abs(scrollTotal.value));
      if (surplusWidth === scrollTotalNum) {
        scrollTotal.value = Math.round(scrollTotal.value + surplusWidth);
      } else {
        scrollTotal.value = Math.round(scrollTotal.value + visualClientWidth);
      }
      cur_scroll_index.value = 1;
      tabTransFrom.value = `translateX(${scrollTotal.value}px)`;
    }
  }
};

const rightArrow = ref();
const onTabArrowHandle = () => {
  fromEvent(rightArrow.value, "click")
    .pipe(
      map((event: any) => {
        console.log(event);

        // let parentNode = event.path.find((item:any) => {console.log(item.classList.includes('tabbar'))});
        // console.log(parentNode)
        // for(let key in event.path){
        // console.log(event.path[key].className)
        // }

        console.log(tabRef.value);
      })
    )
    .subscribe((n) => {
      console.log(n);
    });
};
</script>

<template>
  <div
    class="tabbar"
    :class="{ 'is-scrollable': isScrollLable }"
    style="z-index: 1"
    v-show="tabsList.length"
  >
    <span
      v-show="isScrollLable"
      @click="leftRightHandle('left')"
      class="left-arrow arrow-prev"
    >
      <el-icon><ArrowLeftBold /></el-icon>
    </span>
    <span
      v-show="isScrollLable"
      ref="rightArrow"
      @click="leftRightHandle('right')"
      class="right-arrow arrow-prev"
    >
      <el-icon><ArrowRightBold /></el-icon>
    </span>
    <div ref="tabRef" style="overflow: hidden; display: flex">
      <div class="tab" :style="{ transform: tabTransFrom }">
        <template v-for="(item, index) in tabsList" :key="index">
          <div
            class="tab-item"
            :id="item.path"
            :class="{ 'tab-item-selection': activeKey == item.path }"
            @contextmenu.prevent.enter="openContextMenu($event)"
            @click.self="clickHandle(item)"
          >
            {{ item.title }}
            <el-icon
              @click.stop="removeTab(item.path)"
              style="width: 14px; height: 14px; margin-left: 4px"
              ><CloseBold
            /></el-icon>
          </div>
        </template>
      </div>
      <ul
        class="context-menu"
        v-show="contextMenuVisible"
        :style="{ left: left, top: top }"
      >
        <li @click="closeAllTabs">关闭所有</li>
        <li @click="closeOtherTabs('left')">关闭左边</li>
        <li @click="closeOtherTabs('right')">关闭右边</li>
        <li @click="closeOtherTabs('other')">关闭其它</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-tabs--card > .el-tabs__header {
  border: none !important;
}
.tabbar {
  position: sticky;
  background-color: #f0f5f8;
  left: 0;
  top: 0;
  padding: 10px 0px;
}
.is-scrollable {
  padding: 10px 20px;
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
    // border:1px solid #e4e7ed;
  }
  .tab-item-selection {
    color: $tabBarColor;
  }
}

.tabbar .el-tabs--card > .el-tabs__header {
  height: 80px !important;
}

.context-menu {
  position: absolute;
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 9999;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.2);
  li {
    margin: 0;
    padding: 4px 16px;
    text-align: center;
    &:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
  }
}
.context-menu::before {
  position: absolute;
  top: -4px;
  left: 45px;
  content: "";
  width: 0;
  height: 0;
  content: "";
  border: 5px solid;
  border-color: #fff #fff transparent transparent;
  transform: rotate(-45deg);
  box-shadow: 2px -2px 2px rgba(0, 0, 0, 0.2);
}
</style>
