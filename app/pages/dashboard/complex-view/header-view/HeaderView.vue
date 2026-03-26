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
          <el-menu-item v-else :index="item.key" class="menu__item">
            {{ item.name }}
          </el-menu-item>
        </div>
      </el-menu>
    </template>

    <template #setting-content>
      <!-- 渲染 projectStore.projectList -->
      <el-dropdown @command="handleCommand">
        <span class="project__list">
          <span>{{ projName }}</span>
          <el-icon
            v-if="projectStore.projectList.length > 1"
            class="project__list__icon"
          >
            <ArrowDown />
          </el-icon>
        </span>
        <template v-if="projectStore.projectList.length > 1" #dropdown>
          <el-drop-menu>
            <el-dropdown-item
              v-for="item in projectStore.projectList.filter(
                (proj) => proj.name !== projName
              )"
              :key="item.key"
              :command="item.key"
              :disabled="item.name === projName"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-drop-menu>
        </template>
      </el-dropdown>
    </template>

    <template #main-content>
      <slot name="main-content"></slot>
    </template>
  </HeaderContainer>
</template>

<script setup>
defineProps({
  projName: String,
});

import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@stores/menu.js";
import { useProjectStore } from "@stores/project.js";
import { ArrowDown } from "@element-plus/icons-vue";
import HeaderContainer from "@widgets/header-container/HeaderContainer.vue";
import SubMenu from "./sub-menu/SubMenu.vue";

const routes = useRoute();
const menuStore = useMenuStore();
const projectStore = useProjectStore();

const activeKey = ref("");
const emit = defineEmits(["menu-select"]);

const setActiveKey = () => {
  const menuItem = menuStore.findMenuItem({
    key: "key", // 采用 key 作为搜索索引
    value: routes?.query?.key,
  });
  activeKey.value = menuItem?.key;
};

const handelMenuSelect = (menuKey) => {
  const menuItem = menuStore.findMenuItem({
    key: "key", // 采用 key 作为搜索索引
    value: menuKey,
  });
  emit("menu-select", menuItem);
};

const handleCommand = (projKey) => {
  const projItem = projectStore.projectList.find(
    (item) => item.key === projKey
  );
  if (!projItem || !projItem.homePage) return;
  const { origin, pathname } = window.location;
  window.location.replace(`${origin}${pathname}#${projItem.homePage}`);
  window.location.reload();
};

onMounted(() => {
  setActiveKey();
});

watch([() => menuStore.menuList, () => routes?.query?.key], () => {
  setActiveKey();
});
</script>

<style lang="less" scoped>
.project__list {
  cursor: pointer;
  color: var(--el-color-primary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-right: 20px;
  outline: none;
}

.project__list__icon {
  display: inline-flex;
  align-items: center;
}

:deep(.el-menu--horizontal.el-menu) {
  border-bottom: 1px solid;
}

:deep(.el-menu-item) {
  height: 100%;
}
</style>
