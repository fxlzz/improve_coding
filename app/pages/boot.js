import { createApp } from "vue";

// 全局样式
import "./asserts/common.css";

// 引入 ElementPlus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/theme-chalk/dark/css-vars.css";

// 引入 pinia
import pinia from "@stores";

// 引入 router
import { createWebHashHistory, createRouter } from "vue-router";

/**
 * Vue 工程启动入口
 * @param {object} pageComponent App 页面组件
 * @param {object} routes 路由配置
 * @param {array} libs 第三方库配置
 */
const boat = (pageComponent, { routes, libs } = {}) => {
  const app = createApp(pageComponent);

  app.use(ElementPlus, {
    locale: zhCn,
  });

  app.use(pinia);

  if (libs && libs.length > 0) {
    for (let i = 0; i < libs.length; ++i) {
      app.use(libs[i]);
    }
  }

  if (routes && routes.length > 0) {
    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    app.use(router);
    router.isReady().then(() => {
      app.mount("#app");
    });
  } else {
    app.mount("#app");
  }
};

export default boat;
