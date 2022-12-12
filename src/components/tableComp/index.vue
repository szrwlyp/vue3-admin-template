<script setup lang="ts">
import {
  ref,
  onMounted,
  toRefs,
  markRaw,
  computed,
  onUnmounted,
  nextTick,
} from "vue";
import { deepClone } from "@/utils/index";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";
import imageFormat from "./imageFormat.vue";
import dateFormat from "./dateFormat.vue";
import typeFormat from "./typeFormat.vue";
import buttonFormat from "./buttonFormat.vue";
import { of, skip, take, toArray, map, fromEvent, debounceTime } from "rxjs";

/**
 * Props
 * @param tableData table数据
 * @param tableColumnArr table列配置数组
 */
interface Props {
  tableData: Array<any>;
  tableColumnArr: Array<TableCloumnArrTypes>;
  total: number;
  currentPage: number;
  pageSize: number;
}
const props = defineProps<Props>();

const tableRef = ref();

const tableColumnArrData = ref<Array<TableCloumnArrTypes>>(
  props.tableColumnArr
);

// console.log(props.tableColumnArr);
// console.log(tableColumnArrData.value);

const tableHeight = ref<number>(0);

// 是否禁用表格操作按钮
const isDisabledOperation = ref<boolean>(false);

// emit
const emits = defineEmits([
  "emitSelectionChange",
  "emitEditOperation",
  "emitDeleteOperation",
  "emitPaginationCurrentChange",
  "emitPaginationSizeChange",
]);

/*************************** 表格 ***************************/
// 表格选中的数据列
const selectionChange = (val: any) => {
  isDisabledOperation.value = val.length >= 2 ? true : false;

  // 选中条数>=2时禁止使用操作按钮
  tableColumnArrData.value.map((item) => {
    if (item.component === "buttonFormat") {
      item?.compOptions?.operationButtonArr?.map((arrItem) =>
        Object.assign(arrItem, { disabled: isDisabledOperation.value })
      );
    }
  });
  emits("emitSelectionChange", val);
};

// 修改行数据
const editOperation = (index: number, row: any) => {
  emits("emitEditOperation", index, deepClone(row));
};

// 删除行数据
const deleteOperation = (index: number, row: any) => {
  emits("emitDeleteOperation", index, deepClone(row));
};

// 动态组件集合
const componentMap = new Map([
  ["imageFormat", { name: "imageFormat", tabComp: markRaw(imageFormat) }],
  ["dateFormat", { name: "dateFormat", tabComp: markRaw(dateFormat) }],
  ["typeFormat", { name: "typeFormat", tabComp: markRaw(typeFormat) }],
  ["buttonFormat", { name: "buttonFormat", tabComp: markRaw(buttonFormat) }],
]);

// 动态组件name
const componentName = computed(() => (componentName: any) => {
  return componentMap.get(componentName)?.tabComp;
});

/***************************************************** 分页 *********************************************/
const paginationRef = ref();
// table数据总条数
// const total = toRefs(props.tableData);
// page-size 改变时触发
const paginationSizeChange = (val: number) => {
  emits("emitPaginationSizeChange", val);
};
// current-page 改变时触发
const paginationCurrentChange = (val: number) => {
  tableRef.value.setScrollTop(0);
  emits("emitPaginationCurrentChange", val);
};

// 动态设置表格的高度
const setTableHeight = () => {
  let tableTop = tableRef.value.$el.getBoundingClientRect().top;
  tableHeight.value = tableTop + paginationRef.value.clientHeight;
};

// 监听窗口大小改变事件
const onWindowReSize$ = fromEvent(window, "resize")
  .pipe(debounceTime(300))
  .subscribe({
    next: () => {
      setTableHeight();
    },
  });

onMounted(() => {
  setTableHeight();
});

onUnmounted(() => {
  // 取消订阅
  onWindowReSize$.unsubscribe();
});
</script>

<template>
  <el-table
    :data="tableData"
    ref="tableRef"
    style="width: 100%"
    :max-height="'calc(100vh - ' + tableHeight + 'px)'"
    table-layout="fixed"
    :header-cell-style="{
      background: '#eceff3',
      color: '#000000',
      'text-align': 'center',
    }"
    :cell-style="{ 'text-align': 'center' }"
    @selection-change="selectionChange"
  >
    <el-table-column type="selection" width="55" />
    <template v-for="(item, index) in tableColumnArrData" :key="index">
      <el-table-column
        v-if="!item?.isChange"
        :prop="item.prop"
        :label="item.label"
      />
      <el-table-column v-else :label="item.label">
        <template #default="scope">
          <div>
            <component
              :is="componentName(item.component)"
              :compData="scope.row"
              :cloumnCompOptions="item"
              @emit-edit-operation="editOperation(scope.$index, scope.row)"
              @emit-delete-operation="deleteOperation(scope.$index, scope.row)"
            ></component>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="table-pagination" ref="paginationRef">
    <el-pagination
      :model-value:current-page="currentPage"
      :model-value:page-size="pageSize"
      background
      :page-sizes="[10, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="paginationSizeChange"
      @current-change="paginationCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-button > span:empty) {
  display: none;
}
.table-pagination {
  padding: 18px 0;
  display: flex;
  justify-content: center;
}
</style>
