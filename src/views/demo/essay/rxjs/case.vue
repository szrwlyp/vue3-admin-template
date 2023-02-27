<script setup lang="ts">
import { onMounted, ref } from "vue";
import { concatMap, fromEvent, merge, takeUntil, map } from "rxjs";

const box = ref();
const margin = ref();
onMounted(() => {
  let mouseDown$ = fromEvent(box.value, "mousedown");
  let mouseMove$ = fromEvent(box.value, "mousemove");
  let mouseUp$ = fromEvent(box.value, "mouseup");
  let mouseOut$ = fromEvent(box.value, "mouseout");

  mouseDown$
    .pipe(
      concatMap((startEvent) => {
        let initialLeft = box.value.offsetLeft,
          initialTop = box.value.offsetTop;
        console.log(initialTop, initialLeft);

        let stop$ = mouseUp$;

        return mouseMove$.pipe(
          takeUntil(stop$),
          map((moveEvent) => {
            return {
              x: moveEvent?.x - startEvent?.x + initialLeft,
              y: moveEvent?.y - startEvent?.y + initialTop,
            };
          })
        );
      })
    )
    .subscribe({
      next: ({ x, y }) => {
        console.log(x, y);
        box.value.style.left = `${x}px`;
        box.value.style.top = `${y}px`;
      },
    });
});
</script>

<template>
  <div>
    <div class="margin" ref="margin">
      <div ref="box" class="box"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.margin {
  width: 400px;
  height: 400px;
  border: 1px solid #000;
  .box {
    width: 80px;
    height: 80px;
    background: pink;
    position: absolute;
    left: 10px;
    top: 10px;
  }
}
</style>
