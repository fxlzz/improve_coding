import boot from "../boot";
import DashBoard from "./dashboard.vue";

const routes = [
  {
    path: "/views/dashboard/header",
    component: () => import("./complex-view/header-view/HeaderView.vue"),
  },
  {
    path: "/views/dashboard/iframe",
    component: () => import("./complex-view/iframe-view/IframeView.vue"),
  },
  {
    path: "/views/dashboard/schema",
    component: () => import("./complex-view/schema-view/SchemaView.vue"),
  },
  {
    path: "/views/dashboard/todo",
    component: () => import("./todo/Todo.vue"),
  },
];

// 侧边栏路由
routes.push({
  path: "/views/dashboard/sider",
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
  path: "/views/dashboard/sider/:any",
  component: () => import("./complex-view/sider-view/SiderView.vue"),
});

boot(DashBoard, { routes });
