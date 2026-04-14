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
      moduleType: "", // 模板页类型 sider / schema / iframe / custom
      siderConfig: {
        // 侧边栏菜单
        menu: [{}],
      },
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
              // 字段在 table 中的相关配置
              tableOption: {
                ...elTableColumnConfig, // 标准 el-table-column 配置
                visiable: true, // true 在表格中展示
              },
            },
          },
        },
        // table 相关配置
        tableConfig: {
          headerButtons: [
            // 描述每一个button
            {
              label: "", // 描述button文本
              eventKey: "", // 事件描述
              eventOptions: {
                params: {
                  paramKey: paramValue,
                },
              }, // 事件相关配置
              ...elButtonConfig, // el-button 配置
            },
          ],
          rowButtons: [
            {
              label: "", // 描述button文本
              eventKey: "", // 事件描述
              eventOptions: {}, // 事件相关配置
              ...elButtonConfig, // el-button 配置
            },
          ],
        },
        serachConfig: {},
        components: {},
      },
    },
  ],
};
