import boot from "../boot";
import DashBoard from "./dashboard.vue";

const routes = [
  {
    path: "/header",
    component: () => import("./complex-view/header-view/HeaderView.vue"),
  },
  {
    path: "/iframe",
    component: () => import("./complex-view/iframe-view/IframeView.vue"),
  },
  {
    path: "/schema",
    component: () => import("./complex-view/schema-view/SchemaView.vue"),
  },
  {
    path: "/todo",
    component: () => import("./todo/Todo.vue"),
  },
];

// 侧边栏路由
routes.push({
  path: "/sider",
  component: () => import("./complex-view/sider-view/SiderView.vue"),
  children: [
    {
      path: "iframe",
      component: () => import("./complex-view/iframe-view/IframeView.vue"),
    },
    {
      path: "schema",
      component: () => import("./complex-view/schema-view/SchemaView.vue"),
    },
    {
      path: "todo",
      component: () => import("./todo/Todo.vue"),
    },
  ],
});

// 侧边栏兜底路由
routes.push({
  path: "/sider/:any",
  component: () => import("./complex-view/sider-view/SiderView.vue"),
});

boot(DashBoard, { routes });
