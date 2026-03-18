module.exports = {
  mode: "dashboard",
  name: "course",
  desc: "教程模板",
  menu: [
    {
      key: "study",
      name: "学生管理",
      menuType: "module",
      moduleType: "custom",
      customConfig: {
        path: "/todo",
      },
    },
    {
      key: "teacher",
      name: "教师管理",
      menuType: "module",
      moduleType: "iframe",
      iframeConfig: {
        path: "http://www.baidu.com",
      },
    },
  ],
};
