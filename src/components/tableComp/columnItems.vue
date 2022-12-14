<script setup lang="ts">
import { toRefs, computed, markRaw } from "vue";
import imageFormat from "./comp/imageFormat.vue";
import dateFormat from "./comp/dateFormat.vue";
import typeFormat from "./comp/typeFormat.vue";
import buttonFormat from "./comp/buttonFormat.vue";
import defaultComp from "./comp/defaultComp.vue";
import type { TableCloumnArrTypes } from "@/types/elementPlusTypes";

interface Props {
  columnOptions: TableCloumnArrTypes;
  columnData: any;
}
const props = defineProps<Props>();

const { label, align, fixed, component, children, prop, isChange } = toRefs(
  props.columnOptions
);

// 动态组件集合
const componentMap = new Map([
  ["imageFormat", { name: "imageFormat", tabComp: markRaw(imageFormat) }],
  ["dateFormat", { name: "dateFormat", tabComp: markRaw(dateFormat) }],
  ["typeFormat", { name: "typeFormat", tabComp: markRaw(typeFormat) }],
  ["buttonFormat", { name: "buttonFormat", tabComp: markRaw(buttonFormat) }],
  ["defaultComp", { name: "defaultComp", tabComp: markRaw(defaultComp) }],
]);

// 动态组件name
const componentName = computed(() => (componentName: any) => {
  return componentMap.get(componentName ?? "defaultComp")?.tabComp;
});
</script>

<template>
  <!-- <template v-for="item in columnOptions" :key="item.label"> -->
  <!-- <el-table-column
      v-if="
        (item.type && item.type === 'selection') ||
        item.type === 'expand' ||
        item.type === 'index'
      "
      :prop="item.prop"
      :label="item.label"
      :align="item.align"
      :fixed="item.fixed"
      :type="item.type"
      :width="item.width"
    /> -->
  <!-- <template v-if="item?.children?.length"> -->
  <!-- <el-table-column
      v-if="item?.children?.length"
      :label="item.label"
      :align="item.align"
      :fixed="item.fixed"
    > -->
  <!-- <template v-for="(c_item, index) in item?.children" :key="index">
          <el-table-column
            :label="c_item.label"
            :align="c_item.align"
            :fixed="c_item.fixed"
          ></el-table-column>
        </template> -->

  <!-- </el-table-column> -->
  <!-- </template> -->
  <!-- <el-table-column v-if="item?.children?.length" :label="item.label">
      <column-comp
        v-if="item?.children?.length"
        :columnData="{}"
        :columnOptions="test"
      ></column-comp>
    </el-table-column>
    <el-table-column
      v-else
      :prop="item.prop"
      :label="item.label"
      :align="item.align"
      :fixed="item.fixed"
    ></el-table-column> -->
  <el-table-column v-if="children?.length" v-bind="columnOptions">
    <ColumnItemComp
      v-for="(item, index) in children"
      :key="index"
      :columnData="{}"
      :columnOptions="item"
    ></ColumnItemComp>
  </el-table-column>
  <el-table-column v-else v-bind="columnOptions">
    <template #default="scope">
      <div v-if="isChange">
        <component
          :is="componentName(component)"
          :columnRow="scope.row"
          :columnIndex="scope.$index"
          :columnCompOptions="columnOptions"
        ></component>
      </div>

      <!-- <div v-else>

        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: aaa</div>
            <div>address: aaa</div>
          </template>
          <template #reference>
            <el-tag>aaa</el-tag>
          </template>
        </el-popover>
      </div> -->
    </template>
  </el-table-column>
  <!-- </template> -->
</template>

<style lang="scss" scoped></style>
