<template>
  <div class="sider-containder">
    <SiderContainer>
      <template #menu-content>
        <el-menu
          :default-active="activeKey"
          class="el-menu-vertical"
          @select="onMenuSelect"
        >
          <template v-for="item in menuList">
            <SubMenu
              v-if="item?.submenu?.length > 0"
              :menuItem="item"
            ></SubMenu>
            <el-menu-item v-else :index="item.key">
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu>
      </template>

      <template #main-content>
        <router-view></router-view>
      </template>
    </SiderContainer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useMenuStore } from "@stores/menu.js";
import { useRoute, useRouter } from "vue-router";
import SiderContainer from "@widgets/sider-container/SiderContainer.vue";
import SubMenu from "./sub-menu/SubMenu.vue";

const routes = useRoute();
const router = useRouter();
const menuStore = useMenuStore();

const activeKey = ref("");
const setActiveKey = () => {
  let siderMenuItem = menuStore.findMenuItem({
    key: "key",
    value: routes.query.sider_key,
  });

  // 如果不存在，默认选中第一个
  if (!siderMenuItem) {
    const firstMenuItem = menuStore.findMenuItem({
      key: "key",
      value: routes.query.key,
    });
    if (
      firstMenuItem &&
      firstMenuItem.siderConfig &&
      firstMenuItem.siderConfig.menu
    ) {
      const siderMenuList = firstMenuItem.siderConfig.menu;
      siderMenuItem = menuStore.findFirstMenuItem(siderMenuList);
      if (siderMenuItem) {
        handleMenuSelect(siderMenuItem.key);
      }
    }
  }
};

const menuList = ref([]);
const setMenuList = () => {
  const menuItem = menuStore.findMenuItem({
    key: "key",
    value: routes.query.key,
  });
  if (menuItem && menuItem.siderConfig && menuItem.siderConfig.menu) {
    menuList.value = menuItem.siderConfig.menu;
  }
};

const onMenuSelect = (menuKey) => {
  handleMenuSelect(menuKey);
};

const handleMenuSelect = (menuKey) => {
  // 点击侧边栏菜单，右侧展示对应路由页面
  const menuItem = menuStore.findMenuItem({
    key: "key",
    value: menuKey,
  });

  const { moduleType, key, customConfig } = menuItem;

  const pathMap = {
    iframe: "/iframe",
    schema: "/schema",
    custom: customConfig?.path,
  };

  router.push({
    path: `/sider${pathMap[moduleType]}`,
    query: {
      key: routes.query.key,
      sider_key: key,
      proj_key: routes.query.proj_key,
    },
  });
};

watch(
  () => routes.query.key,
  () => {
    setActiveKey();
    setMenuList();
  }
);

watch(
  () => menuStore.menuList,
  () => {
    setActiveKey();
    setMenuList();
  }
);

onMounted(() => {
  setActiveKey();
  setMenuList();
});
</script>

<style lang="less" scoped>
.sider-containder {
  height: 100%;
}

:deep(.el-main) {
  padding: 0;
}
</style>