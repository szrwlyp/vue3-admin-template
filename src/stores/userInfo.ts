import { defineStore } from "pinia";
import { ref } from "vue";
import { Names } from "./storeName";

export const useUserInfoStore = defineStore(Names.USERSTORE, () => {
  // 用户信息
  const set_userDataStore = ref();
  function setUserData(params: any) {
    set_userDataStore.value = params;
  }

  // sessionId
  const set_sessionIdStore = ref();

  return { set_userDataStore, setUserData, set_sessionIdStore };
});
