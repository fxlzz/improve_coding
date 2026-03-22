<template>
  <HeaderContainer :title="projName">
    <template #menu-content>
      <!-- 渲染 menuStore.menuList -->
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="activeKey"
        @select="handelMenuSelect"
      >
        <div v-for="item in menuStore.menuList" :key="item.key">
          <SubMenu
            v-if="item.submenu && item.submenu.length > 0"
            :menuItem="item"
          >
          </SubMenu>
          <el-menu-item v-else :index="item.key">
            {{ item.name }}
          </el-menu-item>
        </div>
      </el-menu>
    </template>

    <template #setting-content>
      <!-- 渲染 projectStore.projectList -->
      <el-dropdown @command="handleCommand">
        <span class="project-list">{{ projName }}</span>
        <!-- TODO: icon 显示有问题 -->
        <el-icon
          v-if="projectStore.projectList.length > 1"
          class="el-icon--right"
        >
          <ArrowDown />
        </el-icon>
        <template v-if="projectStore.projectList.length > 1" #dropdown>
          <el-drop-menu>
            <el-dropdown-item
              v-for="item in projectStore.projectList"
              :key="item.key"
              :command="item.name"
              :disabled="item.name === projName"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-drop-menu>
        </template>
      </el-dropdown>
    </template>

    <template #main-content></template>
  </HeaderContainer>
</template>

<script setup>
defineProps({
  projName: String,
});

import { ref } from "vue";
import { useMenuStore } from "@stores/menu.js";
import { useProjectStore } from "@stores/project.js";
import { ArrowDown } from "@element-plus/icons-vue";
import HeaderContainer from "@widgets/header-container/headerContainer.vue";
import SubMenu from "../sub-menu/SubMenu.vue";

const menuStore = useMenuStore();
const projectStore = useProjectStore();

const activeKey = ref("");
const handelMenuSelect = () => {};
const handleCommand = () => {};
</script>

<style lang="less" scoped>
.project-list {
  margin-right: 20px;
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  outline: none;
}

:deep(.el-menu--horizontal.el-menu) {
  border-bottom: 0;
}
</style>