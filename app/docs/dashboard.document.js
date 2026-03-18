module.exports = {
  mode: "dashboard", // 模板类型
  name: "", // 名称
  desc: "", // 描述
  icon: "", // icon
  homePage: "", // 首页（项目配置）
  menu: [
    {
      key: "", // 菜单的唯一标识
      name: "", // 菜单名称
      menuType: "", // 菜单类型 module / group
      submenu: [{}], // menuType === group 可以存在子菜单（下拉菜单选项）
      siderConfig: {
        // 侧边栏菜单
        menu: [{}],
      },
      moduleType: "", // 模板页类型 schema / iframe / custom
      iframeConfig: {
        path: "", // url
      },
      customConfig: {
        path: "", // 路由路径
      },
      schemaConfig: {
        api: "", // 数据源 遵循 RESTFUL
        schema: {
          // api json-schema 描述
          type: "object",
          properties: {
            key: {
              // 属性描述
              ...schema,
              type: "", // 字段类型
              label: "", // 字段中文名
            },
          },
        },
        tableConfig: {},
        serachConfig: {},
        components: {},
      },
    },
  ],
};
