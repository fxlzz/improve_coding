<template>
  <iframe :src="path" class="iframe"></iframe>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@stores/menu.js";

const routes = useRoute();
const menuStore = useMenuStore();
const { key, sider_key: siderKey } = routes.query;

const path = ref("");
const setPath = () => {
  const menuItem = menuStore.findMenuItem({
    key: "key",
    value: siderKey ?? key,
  });

  if (menuItem) {
    path.value = menuItem?.iframeConfig?.path;
  }
};

watch([() => key, () => siderKey, () => menuStore.menuList], () => setPath(), {
  deep: true,
});

onMounted(() => setPath());
</script>

<style lang="less" scoped>
.iframe {
  height: 100%;
  width: 100%;
  display: block;
  min-height: 0;
}
</style>