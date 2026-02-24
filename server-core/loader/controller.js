const path = require("path");
const { sep } = path;
const glob = require("glob");
/**
 * controller loader
 * @param {object} app Koa 实例 
 * 
   app/controller
        |
        | -- custom-module
                |
                | -- custom-controller.js
    
    每一个具体的 controller 都可以用 app 来访问
    => app.controller.curstomModule.customController
 */
module.exports = (app) => {
  // 读取 app/controller/**/**.js 下所有的文件
  const targetPath = path.resolve(app.baseDir, `.${sep}controller`);
  const fileList = glob.sync(path.resolve(targetPath, `.${sep}**${sep}**.js`));

  const controller = {};
  for (const file of fileList) {
    let name = path.resolve(file);
    // 截取文件路径
    name = name.substring(
      name.lastIndexOf(`controller${sep}`) + `controller${sep}`.length,
      name.lastIndexOf("."),
    );
    // 转化写法
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    const names = name.split(sep);
    let temp = controller;
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        // 说明是文件
        const ControllerClass = require(path.resolve(file))(app);
        temp[names[i]] = new ControllerClass();
      } else {
        if (!temp[names[i]]) {
          temp[names[i]] = {};
        }
        temp = temp[names[i]];
      }
    }
  }
  // 挂载到 app
  app.controller = controller;
};
