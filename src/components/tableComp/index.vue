<script setup lang="ts">
import {
  ref,
  onMounted,
  toRefs,
  markRaw,
  computed,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import { deepClone } from "@/utils/index";
import { of, skip, take, toArray, map, fromEvent, debounceTime } from "rxjs";
import { tableEventSubject$ } from "./observableSubject";
import ColumnItemComp from "./columnItemComp.vue";

/**
 * Props
 * @param tableData table数据
 * @param tableColumnArr table列配置数组
 * @param pagination 分页参数
 */
interface Props {
  tableData: Array<any>;
  tableOptions: Table.TableConfig;
  tableColumnArr: Array<Table.TableCloumnArrTypes>;
  pagination: Pagination;
}
/**
 * 分页
 * @param total 总条数
 * @param currentPage 当前页
 * @param pageSize 当前页条数
 */
interface Pagination {
  total: number;
  currentPage: number;
  pageSize: number;
}
const props = defineProps<Props>();

// 配置table
const {
  stripe,
  headerCellStyle,
  highlightCurrentRow,
  tableLayout,
  border,
  rowClassName,
  headerRowClassName,
  headerRowStyle,
  showSummary,
  sumText,
  summaryMethod,
} = toRefs(props.tableOptions);

// 分页
const { total, currentPage, pageSize } = toRefs(props.pagination);

const tableRef = ref();

const tableColumnArrData = ref<Array<Table.TableCloumnArrTypes>>(
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

// table 行数据操作
const tableEventSubject = tableEventSubject$.subscribe({
  next: ({ emitEventName, emitParams }: Table.TableEventEmit) => {
    emits(emitEventName, emitParams.index, deepClone(emitParams.row));
  },
});
// 修改行数据
// const editOperation = (index: number, row: any) => {
//   emits("emitEditOperation", index, deepClone(row));
// };

// 删除行数据
// const deleteOperation = (index: number, row: any) => {
//   emits("emitDeleteOperation", index, deepClone(row));
// };

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
  tableEventSubject.unsubscribe();
});

// const rowClassName = ({
//   row,
//   rowIndex,
// }: {
//   row: any;
//   rowIndex: number;
// }) => {
//   console.log(row);
//   console.log(rowIndex);
//   switch (rowIndex) {
//     case 1:
//       return "warning-row";
//     case 3:
//       return "success-row";
//     case 5:
//       return "danger-row";
//     case 7:
//       return "info-row";
//     default:
//       return "";
//   }
// };
</script>

<template>
  <el-table
    :data="tableData"
    ref="tableRef"
    id="elTable"
    style="width: 100%"
    v-bind="tableOptions"
    :max-height="'calc(100vh - ' + tableHeight + 'px)'"
    @selection-change="selectionChange"
  >
    <!-- <column-comp
      :columnData="{}"
      :columnOptionsArr="tableColumnArrData"
    ></column-comp> -->

    <template v-for="(item, index) in tableColumnArrData" :key="index">
      <el-table-column
        v-if="
          (item.type && item.type === 'selection') ||
          (item.type && item.type === 'index') ||
          (item.type && item.type === 'expand')
        "
        v-bind="item"
      >
        <!-- 展开行插槽 -->
        <template v-if="item.type && item.type === 'expand'" #default="props">
          <slot name="expand" :expandData="props.row"></slot>
        </template>
      </el-table-column>
      <ColumnItemComp
        v-else
        :columnData="{}"
        :columnOptions="item"
      ></ColumnItemComp>
    </template>
  </el-table>
  <div class="table-pagination" ref="paginationRef">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
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

:deep(.aaa) {
  background: red;
}

/**
 * 表格行状态
 */
:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-5);
}
:deep(.success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-5);
}
:deep(.danger-row) {
  --el-table-tr-bg-color: var(--el-color-danger-light-5);
}
:deep(.info-row) {
  --el-table-tr-bg-color: var(--el-color-info-light-5);
}
</style>
