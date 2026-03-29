module.exports = {
  name: "拼多多",
  homePage: "/schema?proj_key=pdd&key=product",
  desc: "拼多多模板",
  menu: [
    {
      key: "product",
      name: "商品管理（拼多多版）",
      menuType: "module",
      moduleType: "schema",
      schemaConfig: {
        api: "/api/client",
        schema: {},
      },
    },
    {
      key: "client",
      name: "用户管理（拼多多版）",
      menuType: "module",
      moduleType: "sider",
      siderConfig: {
        menu: [
          {
            key: "list",
            name: "侧边栏1",
            menuType: "module",
            moduleType: "custom",
            customConfig: {
              path: "/todo",
            },
          },
          {
            key: "list2",
            name: "侧边栏2",
            menuType: "module",
            moduleType: "iframe",
            iframeConfig: {
              path: "http://www.baidu.com",
            },
          },
          {
            key: "list3",
            name: "侧边栏3",
            menuType: "group",
            submenu: [
              {
                key: "one",
                name: "一级标签",
                menuType: "module",
                moduleType: "schema",
                schemaConfig: {
                  api: "/api/client",
                  schema: {},
                },
              },
              {
                key: "two",
                name: "二级标签",
                menuType: "module",
                moduleType: "custom",
                customConfig: {
                  path: "/todo",
                },
              },
            ],
          },
        ],
      },
    },
    {
      key: "active",
      name: "运营活动",
      menuType: "group",
      submenu: [
        {
          key: "test1",
          name: "测试数据1",
          menuType: "module",
          moduleType: "custom",
          customConfig: {
            path: "/todo",
          },
        },
        {
          key: "test2",
          name: "测试数据2",
          menuType: "module",
          moduleType: "iframe",
          iframeConfig: {
            path: "http://www.baidu.com",
          },
        },
      ],
    },
  ],
};
