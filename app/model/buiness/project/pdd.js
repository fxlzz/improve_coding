module.exports = {
  name: "pdd",
  homePage: "",
  desc: "拼多多模板",
  menu: [
    {
      key: "product",
      name: "商品管理（拼多多版）",
      menuType: "module",
      moduleType: "iframe",
      iframeConfig: {
        path: "http://wwww.baidu.com",
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
