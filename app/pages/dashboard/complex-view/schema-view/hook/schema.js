import { ref, watch, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@stores/menu.js";

export const useSchema = () => {
  const api = ref("");
  const tableSchema = ref({});
  const tableConfig = ref({});

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
      const { api: apiUrl, schema, tableConfig: tableCfg } = menuItem.schemaConfig;

      const configSchema = JSON.parse(JSON.stringify(schema));

      api.value = apiUrl;
      tableSchema.value = {};
      tableConfig.value = {};

      nextTick(() => {
        tableSchema.value = buildDtoSchema(configSchema, "table");
        tableConfig.value = tableCfg;
      });
    }
  };

  /**
   * 清除噪声 (只保留需要的key)
   */
  const buildDtoSchema = (_schema, keyword) => {
    if (!_schema.properties) return {};

    const dtoSchema = {
      type: "object",
      properties: {},
    };

    // 提取 schema 中有效字段
    for (const key in _schema.properties) {
      const props = _schema.properties[key];
      if (props[`${keyword}Option`]) {
        let dtoProps = {};
        // 提取非 option 字段至 dtoprops 中
        for (const pKey in props) {
          if (pKey.indexOf("Option") < 0) {
            dtoProps[pKey] = props[pKey];
          }
        }
        // 处理 keywordOption 字段
        dtoProps = Object.assign({}, dtoProps, { option: props[`${keyword}Option`] });
        dtoSchema.properties[key] = dtoProps;
      }
    }

    return dtoSchema;
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
    tableSchema,
    tableConfig,
  };
};
