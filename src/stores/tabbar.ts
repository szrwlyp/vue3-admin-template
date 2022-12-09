import { defineStore } from "pinia";
import { ref } from "vue";
import { Names } from "./storeName";
import type { Itabs } from "./storeTypes";
import { of, findIndex, toArray, switchMap, filter } from "rxjs";

export const useTabBarStore = defineStore(Names.TABBAR, () => {
  // tabbar
  const set_tabsList = ref<Array<Itabs>>([]);

  // 获取tabList
  function getTabList() {
    return set_tabsList.value;
  }

  // 添加tab
  function addTabItem(tabs: Itabs) {
    console.log("tabbar.ts");
    if (!Array.isArray(set_tabsList.value)) {
      set_tabsList.value = [];
    }

    const isSome = set_tabsList.value.some(
      (item: Itabs) => item.path == tabs.path
    );
    if (!isSome) {
      set_tabsList.value.push(tabs);
    }
  }

  // 删除当前tab
  function closeCurrentTab(targetName: string) {
    console.log("删除", targetName);
    const index = set_tabsList.value.findIndex(
      (item: Itabs) => item.path === targetName
    );
    set_tabsList.value.splice(index, 1);
    console.log(set_tabsList.value);
  }

  /**
   * 关闭tab
   * closeTypes===left 关闭左边
   * closeTypes===right 关闭右边
   * closeTypes===other 关闭其他
   * closeTypes===all 关闭全部
   */
  type closeType = "other" | "left" | "right" | "all";
  function closeOtherTabs(closeTypes: closeType, currentRouter: string) {
    of(...set_tabsList.value)
      .pipe(
        findIndex((item) => item.path === currentRouter),
        switchMap((index: number) =>
          of(...set_tabsList.value).pipe(
            filter((value: any, i: number) => {
              if (closeTypes === "left") {
                return i >= index;
              }
              if (closeTypes === "right") {
                return i <= index;
              }
              if (closeTypes === "other") {
                return i === index;
              }
              return i === index;
            })
          )
        ),
        toArray()
      )
      .subscribe({
        next: (res) => {
          set_tabsList.value = res;
        },
      });
  }

  return {
    set_tabsList,
    getTabList,
    addTabItem,
    closeCurrentTab,
    closeOtherTabs,
  };
});
