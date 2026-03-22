import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const menuList = ref([]);

  const setMenuList = async (list) => {
    menuList.value = list;
  };

  return {
    menuList,
    setMenuList,
  };
});
