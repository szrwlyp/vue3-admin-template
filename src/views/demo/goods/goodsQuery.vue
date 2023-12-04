<script setup lang="ts">
import { ref } from "vue";
import TestComp from "@/components/testComp.vue";

const searchText = ref("ddd");
</script>

<template>
  <div>
    商品查询
    <!-- <TestComp
      :model-value="searchText"
      @update:model-value="(newValue) => (searchText = newValue)"
    /> -->
    <TestComp v-model="searchText" />
    <div>{{ searchText }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
