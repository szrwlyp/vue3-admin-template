<script setup lang="ts">
import { ref, toRefs } from "vue";
import loadingComp from "./loadingComp.vue";

/**
 * imageCompProps
 * @param width 图片宽度
 * @param height 图片高度
 * @param src 图片地址
 * @param loading 图片加载动画
 * @param error 图片加载失败时默认图片
 * @param lazy 是否懒加载
 * @parma mode 图片裁剪，缩放的模式
 */
interface IImageCompProps {
  width?: string | number;
  height?: string | number;
  src: string;
  loading: boolean;
  error: string;
  lazy: boolean;
  mode:
    | "fill"
    | "contain"
    | "cover"
    | "none"
    | "scale-down"
    | "initial"
    | "inherit";
}
let props = withDefaults(defineProps<IImageCompProps>(), {
  width: "auto",
  height: "auto",
  loading: true,
  error: new URL("./loading_error.png", import.meta.url).href,
  lazy: false,
  mode: "cover",
});
console.warn(toRefs(props));
// let { loading } = toRefs<ILazyImgProps>(props);
const loading = ref(props.loading);

const mode = ref(props.mode);
/**
 * 自定义图片懒加载指令
 */
const vLazy = {
  mounted: (el: any, binding: any) => {
    // console.log(el);
    // console.log(binding);
    let { isLazy, src } = binding.value;

    // 图片不懒加载
    if (!isLazy) {
      onImageloadingEvent(el, src);
      return;
    }

    // 图片不懒加载
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el);
          onImageloadingEvent(el, src);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(el);
  },
};
/**
 * 图片加载事件
 */
const onImageloadingEvent = (el: any, src: string) => {
  el.onload = () => {
    loading.value = false;
  };
  el.onerror = () => {
    loading.value = false;
    el.src = props.error;
    mode.value = "fill";
  };

  el.src = src;
};
</script>

<template>
  <div class="image-comp" :style="{ width: width, height: height }">
    <loadingComp text="加载中" :isShowText="true" v-if="loading"></loadingComp>
    <img
      class="image-success-style"
      v-lazy="{ isLazy: props.lazy, src: props.src }"
      :style="{ 'object-fit': mode }"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.image-comp {
  position: relative;
}
.image-success-style {
  height: 100%;
  width: 100%;
}
</style>
