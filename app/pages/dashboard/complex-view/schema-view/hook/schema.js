import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@stores/menu.js";

export const useSchema = () => {
  const api = ref("");

  const routes = useRoute();
  const { key, sider_key: siderKey } = routes.query;
  const menuStore = useMenuStore();

  /**
   * 解析构建schema
   */
  const buildData = () => {
    const menuItem = menuStore.findMenuItem({
      key: "key",
      value: siderKey ?? key,
    });

    if (menuItem && menuItem.schemaConfig) {
      const { api: apiUrl } = menuItem.schemaConfig;
      api.value = apiUrl;
    }
  };

  watch(
    [() => key, () => siderKey, () => menuStore.menuList],
    () => {
      buildData();
    },
    { deep: true },
  );

  onMounted(() => {
    buildData();
  });

  return {
    api,
  };
};
