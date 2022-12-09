<script setup lang="ts">
import { ref, toRefs, onMounted, computed } from "vue";
import { myTableScrollTop$ } from "@/observable/subjects/subject";

// props
interface Props {
  total: number;
  currentPage: number;
  pageSize: number;
}
const props = defineProps<Props>();
const { total, currentPage, pageSize } = toRefs(props);

// emit
const emits = defineEmits([
  "emitPaginationCurrentChange",
  "emitPaginationSizeChange",
]);

// page-size 改变时触发
const paginationSizeChange = (val: number) => {
  // myTableScrollTop$.next(true);
  emits("emitPaginationSizeChange", val);
};
// current-page 改变时触发
const paginationCurrentChange = (val: number) => {
  myTableScrollTop$.next(true);
  emits("emitPaginationCurrentChange", val);
};
</script>

<template>
  <div class="table-pagination">
    <el-pagination
      :model-value:current-page="currentPage"
      :model-value:page-size="pageSize"
      background
      :page-sizes="[10, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="paginationSizeChange"
      @current-change="paginationCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.table-pagination {
  padding: 18px 0;
  display: flex;
  justify-content: center;
}
</style>
