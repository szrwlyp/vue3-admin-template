<script setup lang="ts">
import { toRefs, computed, markRaw } from "vue";
import imageFormat from "./comp/imageFormat.vue";
import dateFormat from "./comp/dateFormat.vue";
import typeFormat from "./comp/typeFormat.vue";
import buttonFormat from "./comp/buttonFormat.vue";
import defaultComp from "./comp/defaultComp.vue";

interface Props {
  columnOptions: Table.TableCloumnArrTypes;
  columnData: any;
}
const props = defineProps<Props>();

const { label, align, fixed, component, children, prop } = toRefs(
  props.columnOptions
);
// console.log(children);
// console.warn(props.columnOptions);

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

  <!-- 多级表头 -->
  <template v-if="children && children?.length">
    <el-table-column v-bind="columnOptions">
      <ColumnItemComp
        v-for="(item, index) in children"
        :key="index"
        :columnData="{}"
        :columnOptions="item"
      ></ColumnItemComp>
    </el-table-column>
  </template>
  <el-table-column v-else v-bind="columnOptions">
    <!-- <template #header>
      <div>自定义表头</div>
    </template> -->
    <template #default="scope">
      <div>
        <component
          :is="componentName(component)"
          :columnRow="scope.row"
          :columnIndex="scope.$index"
          :columnCompOptions="columnOptions"
        ></component>
      </div>
    </template>
  </el-table-column>
  <!-- </template> -->
</template>

<style lang="scss" scoped></style>
