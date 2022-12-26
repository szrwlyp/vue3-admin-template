<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { storeToRefs } from "pinia";
import Charts from "@/components/eCharts/index.vue";
import type { chartBaseOptionsType } from "@/typings/eCharts";
import { demo1, demo2 } from "@/modules/eCharts/demo";

const chartBaseOptions = reactive<chartBaseOptionsType>({
  width: 500,
  height: 500,
  chartsId: "test",
});

const setOptionsData = ref(demo1);

onMounted(() => {
  setTimeout(() => {
    demo2.series = [
      {
        name: "销量1",
        type: "bar",
        data: [100, 20, 36, 10, 10, 20],
      },
    ];
    // setOptionsData.value = demo2;

    console.log(setOptionsData.value);
  }, 2000);
});
</script>

<template>
  <div>
    <Charts
      :chartBaseOptions="chartBaseOptions"
      :setOptions="setOptionsData"
    ></Charts>
  </div>
</template>

<style lang="scss"></style>
