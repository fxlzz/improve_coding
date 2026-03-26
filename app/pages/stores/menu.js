import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const menuList = ref([]);

  const setMenuList = async (list) => {
    menuList.value = list;
  };

  /**
   * 根据 key 作为查询索引，查找等于 value 的 menuItem
   * @param {object} options 配置对象
   * @param {string} options.key 查询索引
   * @param {any} options.value 查询值
   * @param {object} mList 被查询对象(不传)
   */
  const findMenuItem = ({ key, value }, mList = menuList.value) => {
    for (let i = 0; i < mList.length; i++) {
      const menuItem = mList[i];

      if (!menuItem) continue;

      if (menuItem[key] === value) return menuItem;

      const { menuType, moduleType } = menuItem;
      if (menuType === "group" && menuItem?.submenu.length > 0) {
        const mItem = findMenuItem({ key, value }, menuItem.submenu);
        if (mItem) return mItem;
      }

      if (moduleType === "sider" && menuItem?.siderConfig?.menu.length > 0) {
        const mItem = findMenuItem({ key, value }, menuItem.siderConfig.menu);
        if (mItem) return mItem;
      }
    }
  };

  /**
   * 找到 menu 的第一个选项
   * @param {*} mList
   */
  const findFirstMenuItem = (mList = menuList.value) => {
    if (!Array.isArray(mList) || !mList.length || !mList[0]) return;

    if (!mList[0].submenu) return mList[0];
    if (mList[0].submenu) return mList[0].submenu[0];
  };

  return {
    menuList,
    setMenuList,
    findMenuItem,
    findFirstMenuItem,
  };
});
