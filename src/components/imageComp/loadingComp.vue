<script setup lang="ts">
import { ref } from "vue";

interface ILoadingProps {
  text?: string;
  isShowText?: boolean;
  scale?: number;
}
let props = withDefaults(defineProps<ILoadingProps>(), {
  text: "加载中...",
  isShowText: false,
  scale: 1,
});
</script>
<template>
  <div class="loading">
    <svg
      width="50"
      height="70"
      :style="{ transform: 'scale(' + props.scale + ')' }"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="transparent"
        stroke-width="3"
        stroke-dasharray="31.415, 31.415"
        stroke="#02bcfe"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0, 25 25;360, 25 25"
          dur="1.5s"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          values="#02bcfe;#3be6cb;#02bcfe"
          dur="3s"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="10"
        fill="transparent"
        stroke-width="3"
        stroke-dasharray="15.7, 15.7"
        stroke="#3be6cb"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360, 25 25;0, 25 25"
          dur="1.5s"
          repeatCount="indefinite"
        ></animateTransform>
        <animate
          attributeName="stroke"
          values="#3be6cb;#02bcfe;#3be6cb"
          dur="3s"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <text class="loading-text" v-if="isShowText" x="0" y="65">
        {{ props.text }}
      </text>
    </svg>
    <!-- <div class="text">{{ props.text }}</div> -->
  </div>
</template>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  /* color: #fff; */
  flex-direction: column;
  font-weight: 700;
}

.loading-text {
  font-size: 14px;
}
</style>
