<template>
  <HeaderView :projName="projName" @menu-select="onMenuSelect">
    <template #main-content>
      <router-view></router-view>
    </template>
  </HeaderView>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { fetchProjectConfig, fetchProjectList } from "./apis/dashboard.js";
import { useMenuStore } from "@stores/menu.js";
import { useProjectStore } from "@stores/project.js";
import HeaderView from "./complex-view/header-view/HeaderView.vue";

const router = useRouter();
const routes = useRoute();

const projName = ref("");
const menuStore = useMenuStore();
const projectStore = useProjectStore();

// 点击菜单，跳转至对应 view 页面
const onMenuSelect = (menuItem) => {
  const { key, moduleType, customConfig } = menuItem;
  if (key === routes?.query?.key) return;

  const pathMap = {
    iframe: "/iframe",
    schema: "/schema",
    sider: "/sider",
    custom: customConfig?.path,
  };

  router.push({
    path: pathMap[moduleType],
    query: { key, proj_key: routes.query.proj_key },
  });
};

onMounted(() => {
  getProjectConfig();
  getProjectList();
});

// 获取 project list
const getProjectList = async () => {
  const projectList = await fetchProjectList();
  projectStore.setProjectList(projectList);
};

// 获取 project config
const getProjectConfig = async () => {
  const projConfig = await fetchProjectConfig({
    proj_key: routes.query.proj_key,
  });
  const { name, menu } = projConfig;
  projName.value = name;
  menuStore.setMenuList(menu);
};
</script>

<style lang="less" scoped>
:deep(.el-main) {
  padding: 0;
}
</style>