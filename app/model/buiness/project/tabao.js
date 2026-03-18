module.exports = {
  mode: "dashboard",
  name: "tabao",
  desc: "淘宝模板",
  menu: [
    {
      key: "client",
      name: "客户管理",
      menuType: "module",
      moduleType: "iframe",
      iframeConfig: {
        path: "http://wwww.baidu.com",
      },
    },
    {
      key: "active",
      name: "数据分析",
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
      ],
      siderConfig: {
        menu: [
          {
            key: "dianshang",
            name: "电商罗盘",
            menuType: "module",
            moduleType: "iframe",
            iframeConfig: {
              path: "http://www.baidu.com",
            },
          },
        ],
      },
    },
  ],
};
