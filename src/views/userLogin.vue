<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import Form from "@/components/formComp/index.vue";
import type { FormRules } from "element-plus";
import type { formItemArrTypes } from "@/types/elementPlusTypes";
import { userLogin } from "@/modules/user";
import { sleep } from "@/utils/index";
import { u_ElMessage } from "@/utils/elementPlus";
import { useUserInfoStore } from "@/stores/userInfo";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const userInfoStore = useUserInfoStore();
const { set_sessionIdStore } = storeToRefs(userInfoStore);

const router = useRouter();
const route = useRoute();

const formData = ref({
  userName: "",
  password: "",
});

// 需要查询的item
const formItemArr = ref<Array<formItemArrTypes>>([
  {
    prop: "userName",
    model: "userName",
    component: "input",
    inputCompOptions: {
      type: "text",
      placeholder: "用户名",
      inputSlot: "prefix",
      inputSlotContent: "User",
      inputEmitEvent: "emitSubmitButton",
      size: "large",
    },
  },
  {
    prop: "password",
    model: "password",
    component: "input",
    inputCompOptions: {
      placeholder: "密码",
      type: "password",
      inputSlot: "prefix",
      inputSlotContent: "Lock",
      inputEmitEvent: "emitSubmitButton",
      size: "large",
    },
  },
  {
    prop: "",
    model: "",
    component: "button",
    buttonCompOptions: {
      buttonArr: [
        {
          buttonText: "登录",
          type: "primary",
          size: "large",
          width: "100%",
          emitEvent: "emitSubmitButton",
        },
        // {
        //   buttonText: "重置",
        //   icon: "Refresh",
        //   plain: true,
        //   size: "large",
        //   emitEvent: "emitResetButton",
        // },
      ],
    },
  },
]);

// 表单校验
const loginRules = reactive<FormRules>({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const buttonLoading = (loading: boolean) => {
  formItemArr.value.map((item) => {
    if (item.component === "button") {
      item.buttonCompOptions?.buttonArr?.map((buttonItem, index) => {
        if (buttonItem.emitEvent === "emitSubmitButton") {
          buttonItem = Object.assign(buttonItem, { loading });
        }
        return buttonItem;
      });
    }
  });
};
const handleFormSubmit = () => {
  console.log(formData);
  let { userName: username, password: pwd } = formData.value;
  buttonLoading(true);
  userLogin({ username, pwd }).subscribe({
    next: async (res) => {
      let { code, msg, data } = res;

      if (code != 0) {
        u_ElMessage({ type: "error", message: msg });
        buttonLoading(false);
        return;
      }
      u_ElMessage({ type: "success", message: "登录成功" });
      await sleep(1000);
      buttonLoading(false);
      set_sessionIdStore.value = data.sessionid;
      userInfoStore.setUserData(data);

      let redirect = route.query.redirect as string;
      router.push(redirect ? redirect : "/");
    },
    error: (err) => {
      console.log(err);
    },
  });
};

onMounted(() => {
  // console.log(router);
  // console.log(route);
  // setTimeout(() => {
  //   aaa.compOptions.buttonArr[0].text = "aaa";
  //   console.log(aaa.compOptions.buttonArr);
  // }, 1000);
});
</script>

<template>
  <div class="login">
    <div class="login_form">
      <h2 class="login_title">系统登录</h2>
      <div class="form">
        <Form
          ref="formRef"
          :inline="false"
          :rules="loginRules"
          :form-item-arr="formItemArr"
          :form-data="formData"
          @emit-form-submit="handleFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  background: #324157;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5 url(../assets/background.ebcb9160.svg) no-repeat 50%;
  .login_form {
    box-shadow: 0 0 12px 1px #909399;
    border-radius: 7px;
    background: #fff;
    padding: 30px;
    .login_title {
      font-weight: 700;
      text-align: center;
    }
    .form {
      padding: 0 20px;
      width: 400px;
    }
  }
}

// :deep(.login_form .el-form-item) {
//   border: 1px solid hsla(0, 0%, 100%, 0.1);
//   background: rgba(0, 0, 0, 0.1);
//   border-radius: 5px;
//   color: #454545;
// }
// :deep(.login_form .el-input__wrapper) {
//   background: transparent;
//   box-shadow: none;
// }
// :deep(.login_form .el-input__wrapper .el-input__inner) {
//   color: #fff;
//   font-weight: 700;
//   font-size: 18px;
// }
</style>
