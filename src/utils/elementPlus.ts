import { markRaw, nextTick } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
import "element-plus/theme-chalk/el-overlay.css";

const iconMap = new Map([["Delete", { iconComp: markRaw(Delete) }]]);
export const u_ElMessageBoxConfig = (
  title: string,
  content: string,
  icon: any,
  types?: string
) => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
    icon: iconMap.get(icon)?.iconComp,
  });
};

/**
 * Message消息提示
 * @param m_type 消息类型
 * @param m_message  消息文字
 */
type messageType = "success" | "warning" | "info" | "error";
interface UELMessage {
  type: messageType;
  message: string;
  duration?: number;
}
export const u_ElMessage = (messageOptions: UELMessage) => {
  const { type, message, duration } = messageOptions;
  return ElMessage({
    type,
    message,
    duration,
  });
};

/**
 *
 * @param text 显示在加载图标下方的加载文案
 * @param background 遮罩背景色
 * @param target Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
 * @param lock 锁定屏幕的滚动
 * @param spinner 自定义加载图标类名
 */
interface LoadingOptions {
  text?: string;
  background?: string;
  target?: HTMLElement | string;
  lock?: boolean;
  spinner?: string;
}
/**
 * 表格加载
 * tableLoadingInstance 加载实例
 * tableLoading 加载方法
 */
export let tableLoadingInstance: any = {};
export const tableLoading = (options?: LoadingOptions): void => {
  const param = {
    target: (document.getElementById("elTable") as HTMLElement) ?? "",
    ...options,
  };
  tableLoadingInstance = ElLoading.service(param);
};
