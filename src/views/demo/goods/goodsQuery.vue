<script setup lang="ts">
import { ref } from "vue";
import {
  useArrayFilter,
  useDateFormat,
  useNow,
  useTimeAgo,
  useClipboard,
  useColorMode,
  useTitle,
  useCssVar,
} from "@vueuse/core";
import TestComp from "@/components/testComp.vue";
const list = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

const result = useArrayFilter(list, (item) => item % 2 === 0);
console.log(result.value);
list.value.shift();
console.log(result.value);

const formatted = useDateFormat(useNow(), "YYYY-MM-DD (ddd)", {
  locales: "en-US",
});

// const timeAgo = formatTimeAgo(new Date(2021, 0, 1)); // string
const timeAgo = useTimeAgo(new Date(2023, 10, 1));
console.log(timeAgo.value);
const searchText = ref("ddd");

const { text, copy, isSupported } = useClipboard();

const mode = useColorMode();
const btn = () => {
  mode.value = mode.value === "light" ? "dark" : "light";
  console.log(mode.value);
};

const title = useTitle();
const setTitle = () => {
  title.value = "Hello"; // change current title
};
const el = ref(null);
const color = useCssVar("font-size", el);
const switchColor = () => {
  color.value = "30px";
  // color.value = "#df8543";
};

console.log(color.value);

const idCard =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

//合并两个数组
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
console.log(arr3);
</script>

<template>
  <div class="home">
    商品查询
    <!-- <TestComp
      :model-value="searchText"
      @update:model-value="(newValue) => (searchText = newValue)"
    /> -->
    <TestComp v-model="searchText" />
    <div>{{ searchText }}</div>
    <div>{{ formatted }}</div>

    <button @click="copy(searchText)">Copy</button
    ><button @click="btn">切换</button>

    <button @click="setTitle">动态设置标题</button>
    <button @click="switchColor">change color</button>

    <div v-if="idCard.test(searchText)">
      {{ searchText }} 是合法的身份证号码
    </div>
    <div v-else>{{ searchText }} 不是合法的身份证号码</div>
  </div>
</template>

<style lang="scss" scoped></style>
