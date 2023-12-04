<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { storeToRefs } from "pinia";
import Charts from "@/components/eCharts/index.vue";
import type { chartBaseOptionsType } from "@/typings/eCharts";
import { demo1, demo2 } from "@/modules/eCharts/demo";
import { chartBaseOptionsTest, handlerEcharts } from "@/modules/eCharts/demo2";

const chartBaseOptions = reactive<chartBaseOptionsType>({
  width: 500,
  height: 500,
  chartsId: "test",
  setOptions: demo1,
});

handlerEcharts();

const randomUserName = () => {
  let userNameArr: Array<string> = [
    "蓝玉萍1",
    "钟宇芳1",
    "蓝玉萍2",
    "钟宇芳2",
    "蓝玉萍3",
    "钟宇芳3",
    "蓝玉萍4",
    "钟宇芳4",
    "蓝玉萍5",
    "钟宇芳5",
  ];

  let randomArr = userNameArr.sort(() => Math.random() - 0.5);
  console.log(randomArr);
  let num = Math.floor(Math.random() * 9 + 0);
  console.log(num);
  console.log(randomArr[num]);
};

onMounted(() => {
  setTimeout(() => {
    demo2.series = [
      {
        name: "销量1",
        type: "bar",
        data: [100, 20, 36, 10, 10, 20],
      },
    ];
  }, 2000);

  let url = "https://www.baidu.com?name=zhangsan&age=20";

  var searchParams = new URLSearchParams(url);
  console.log(searchParams);
  console.log(searchParams.get("age"));
});
</script>

<template>
  <div>
    <Charts :chartBaseOptions="chartBaseOptions"></Charts>

    <div @click="randomUserName">点击</div>

    <Charts :chartBaseOptions="chartBaseOptionsTest"></Charts>
  </div>
</template>

<style lang="scss"></style>
