<script setup lang="ts">
import { ref, onMounted, toRefs, watch } from "vue";
import * as echarts from "echarts/core";
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
} from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type { chartBaseOptionsType } from "@/typings/eCharts";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
]);

/**
 * Props
 * @param chartBaseOptions 基础配置
 */
interface Props {
  chartBaseOptions?: chartBaseOptionsType;
  // setOptions: Object;
}

const props = withDefaults(defineProps<Props>(), {
  chartBaseOptions: () => {
    return { width: 300, height: 300, chartsId: "test", setOptions: {} };
  },
});

let { width, height, chartsId } = toRefs<chartBaseOptionsType>(
  props.chartBaseOptions
);

console.log(props);
console.log(width, height);

// 监听setOptions并更新
watch(
  () => props.chartBaseOptions.setOptions,
  (newValue, oldValue) => {
    console.log(newValue);
    initChart();
  },
  { deep: true }
);

// 初始化图表
const charts = ref<any>(null);
const initChart = () => {
  charts.value = echarts.init(
    document.getElementById(chartsId.value) as HTMLElement
  );
  charts.value.setOption(props.chartBaseOptions.setOptions);
};

onMounted(() => {
  initChart();
});
</script>

<template>
  <div
    :id="chartsId"
    :style="{ width: width + 'px', height: height + 'px' }"
    class="charts"
  ></div>
</template>

<style lang="scss" scoped>
.charts {
}
</style>
