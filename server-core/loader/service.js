const path = require("path");
const { sep } = path;
const glob = require("glob");
/**
 * service loader
 * @param {object} app Koa 实例 
 * 
   app/service
        |
        | -- custom-module
                |
                | -- custom-service.js
    
    每一个具体的 service 都可以用 app 来访问
    => app.service.curstomModule.customService
 */
module.exports = (app) => {
  // 读取 app/service/**/**.js 下所有的文件
  const targetPath = path.resolve(app.baseDir, `.${sep}service`);
  const fileList = glob.sync(path.resolve(targetPath, `.${sep}**${sep}**.js`));

  const service = {};
  for (const file of fileList) {
    let name = path.resolve(file);
    // 截取文件路径
    name = name.substring(
      name.lastIndexOf(`service${sep}`) + "service".length,
      name.lastIndexOf("."),
    );
    // 转化写法
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    const names = name.split(sep);
    let temp = service;
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        // 说明是文件
        const ServiceClass = require(path.resolve(file))(app);
        temp[names[i]] = new ServiceClass();
      } else {
        if (!temp[names[i]]) {
          temp[names[i]] = {};
        }
        temp = temp[names[i]];
      }
    }
  }
  // 挂载到 app
  app.service = service;
};
