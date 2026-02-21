const path = require("path");
const { sep } = path;
const glob = require("glob");
/**
 * router-schema loader
 * @param {object} app Koa 的实例
 *
 * 通过 'json-schema & ajv' 校验路由规则
 * app/router-schema/**.js
 * 
   app.routerSchema = {
        ${api1}: ${json-schema},
        ${api2}: ${json-schema},
        ${api3}: ${json-schema},
   }
 */
module.exports = (app) => {
  // 读取 app/router-schema/**.js 目录的文件
  const targetPath = path.resolve(app.baseDir, `.${sep}router-schema`);
  const fileList = glob.sync(path.resolve(targetPath, `.${sep}**.js`));

  let routerSchema = {};
  for (const file of fileList) {
    routerSchema = {
      ...routerSchema,
      ...require(path.resolve(file)),
    };
  }

  app.routerSchema = routerSchema;
};

7;
