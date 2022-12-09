<script setup lang="ts">
defineProps<{
  collapsed: boolean;
}>();
</script>

<template>
  <div class="logo">
    <img src="@/assets/logo.svg" alt="" />
    <h2 v-show="!collapsed" class="title">vue3-admin</h2>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  height: 64px;
  overflow: hidden;
  white-space: nowrap;
  img {
    height: 32px;
    width: 64px;
  }
  .title {
    font-size: 20px;
    color: #fff;
  }
}
</style>
