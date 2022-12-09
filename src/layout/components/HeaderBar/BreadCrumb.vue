<script setup lang='ts'>
import { match } from 'assert';
import { first } from 'lodash';
import { ref,Ref,watch } from 'vue'
import { useRoute,RouteLocationMatched } from 'vue-router'
const route = useRoute()

const breadcrumb:Ref<RouteLocationMatched[]> = ref([])

const getBreadCrumb = ()=>{
  // console.log(route.matched)
  // item.children.length !== 1 && 
  //  && item.meta.hasOwnProperty('showChildren')
  let matched = route.matched.filter((item) => item.meta && item.meta.title),
      frist = matched[0];
  // console.log(matched)
  // console.log(frist)
  if(frist.path !== '/index' && frist.path !== '/'){
    matched = [{path:'/index',meta:{title:'首页'}} as any].concat(matched)
  }

  breadcrumb.value = matched
}

getBreadCrumb()

// 监控路由，如果路由发生变化，那么面包屑数据变化
watch(()=>route.path,()=>{
  getBreadCrumb();
})

</script>

<template>
  <div>
    <el-breadcrumb >
      <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="{ path: item.redirect || item.path }">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  
</template>

<style lang='scss' scoped>
</style>