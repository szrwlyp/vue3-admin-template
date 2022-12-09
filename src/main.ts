import { createApp } from "vue";
import pinia from "@/stores/index";
import * as ElIcons from "@element-plus/icons";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "default-passive-events";
// import "./style.css";

// 国际化
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);

for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name]);
}
app.use(pinia);
app.use(router);

app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
