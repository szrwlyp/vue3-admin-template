import { ref } from "vue";
export function useTool() {
  /**
   * 图形验证码
   */
  const codeUrl = ref("/api/api/v1/user/code");
  const resetCode = () => {
    console.warn("aaaa");
    codeUrl.value = codeUrl.value + "?" + Math.random();
  };

  return { codeUrl, resetCode };
}
