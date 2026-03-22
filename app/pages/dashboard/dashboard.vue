<template>
  <HeaderView :projName="projName"></HeaderView>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchProjectConfig, fetchProjectList } from "./apis/dashboard.js";
import { useMenuStore } from "@stores/menu.js";
import { useProjectStore } from "@stores/project.js";
import HeaderView from "./complex-view/header-view/HeaderView.vue";

const projName = ref("");
const menuStore = useMenuStore();
const projectStore = useProjectStore();

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
    // TODO: 接收点击 进入系统 的name
    proj_key: "tabao",
  });
  const { name, menu } = projConfig;
  projName.value = name;
  menuStore.setMenuList(menu);
};
</script>

<style lang="less" scoped>
</style>