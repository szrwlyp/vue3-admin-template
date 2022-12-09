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
import { Delete, Edit } from "@element-plus/icons-vue";
import { deepClone } from "@/utils/index";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";
import imageFormat from "./imageFormat.vue";
import dateFormat from "./dateFormat.vue";
import typeFormat from "./typeFormat.vue";
import buttonFormat from "./buttonFormat.vue";
import { myTableScrollTop$ } from "@/observable/subjects/subject";

/**
 * Props
 * @param height table动态高度
 * @param tableData table数据
 * @param tableColumnArr table列配置数组
 */
interface Props {
  height: number;
  tableData: Array<any>;
  tableColumnArr: Array<TableCloumnArrTypes>;
}
const props = defineProps<Props>();

const tableRef = ref();

const tableColumnArrData = ref<Array<TableCloumnArrTypes>>(
  props.tableColumnArr
);

// console.log(props.tableColumnArr);
// console.log(tableColumnArrData.value);

// 是否禁用表格操作按钮
const isDisabledOperation = ref<boolean>(false);

// emit
const emits = defineEmits([
  "emitSelectionChange",
  "emitEditOperation",
  "emitDeleteOperation",
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

// table是否滚动到顶部
const tableScrollTop$ = myTableScrollTop$.subscribe({
  next: (res) => {
    console.warn("myTableScrollTop$", res);

    res && tableRef.value.setScrollTop(0);
  },
});

onMounted(() => {});

onUnmounted(() => {
  // 取消订阅
  tableScrollTop$.unsubscribe();
});

const test = (index: number, row: any) => {
  console.log(row);
};
</script>

<template>
  <el-table
    :data="tableData"
    ref="tableRef"
    style="width: 100%"
    :max-height="'calc(100vh - ' + height + 'px)'"
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

    <!-- <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="large"
          type="primary"
          :icon="Edit"
          :disabled="isDisabledOperation"
          circle
          @click="editOperation(scope.$index, scope.row)"
        ></el-button>
        <el-button
          size="large"
          type="danger"
          :icon="Delete"
          :disabled="isDisabledOperation"
          circle
          @click="deleteOperation(scope.$index, scope.row)"
        ></el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<style lang="scss" scoped>
:deep(.el-button > span:empty) {
  display: none;
}
</style>
