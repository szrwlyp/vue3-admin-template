<script setup lang="ts">
import { ref, onMounted } from "vue";
import BreadCrumb from "./BreadCrumb.vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const userInfoStore = useUserInfoStore();
const router = useRouter();
const { set_userDataStore } = storeToRefs(userInfoStore);

// 用户姓名
const userName = ref(set_userDataStore.value?.name ?? "");

const signOut = () => {
  userInfoStore.$reset();
  router.push("/login");
};
</script>

<template>
  <div class="header">
    <!-- 面包屑 -->
    <bread-crumb />
    <div class="header-right">
      <div class="user-head">
        <img class="head-img" src="@/assets/default_handsome.jpg" />
        <el-icon class="arrow_down"><ArrowDown /></el-icon>

        <div class="user-info">
          <div style="height: 10px"></div>
          <div class="info-item">
            <div class="info">
              <div class="user-name">{{ userName }}</div>
            </div>
            <div class="hanlder">我的账号</div>
            <div class="hanlder">我的积分</div>
            <div class="sign-out" @click="signOut">退出登录</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .header-right {
    .user-head {
      display: flex;
      align-items: center;
      // cursor: pointer;
      .head-img {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-right: 6px;
        // cursor: pointer;
      }
      .arrow_down {
        transition: transform 0.6s;
      }
      .user-info {
        width: 200px;
        position: absolute;
        right: 0;
        top: 35px;
        background: rgba(255, 255, 255, 0);
        display: none;
        transition: display 2s;
        .info-item {
          box-shadow: 0 0 4px 1px #ccc;
          background: #fff;
          .info {
            background: #f1f4f5;
            padding: 7px 10px;
            .user-name {
              font-weight: 700;
              font-size: 16px;
            }
          }
          .hanlder {
            padding: 4px 16px;
            margin: 4px 0;
            cursor: pointer;
            &:hover {
              background: #f1f4f5;
            }
          }
          .sign-out {
            border-top: 1px solid #ccc;
            padding: 10px 0;
            cursor: pointer;
            text-align: center;
            &:hover {
              background: #f1f4f5;
              font-weight: 700;
            }
          }
        }
      }
      &:hover .user-info {
        display: block;
        z-index: 1000;
      }
      &:hover .arrow_down {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
