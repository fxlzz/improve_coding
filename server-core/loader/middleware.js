const path = require("path");
const { sep } = path;
const glob = require("glob");
/**
 * middleware loader
 * @param {object} app Koa 实例
 * 
 * 加载所有 middleware, 加载完后，可通过 'app.middlewares.${目录}.${文件}' 访问
 
   app/middleware
      |
      | -- custom-module // 目录
              |
              | -- custom-middleware.js // 文件

    => app.middlewares.customModule.customMiddleware
    
    结构：
    app.middlewares = {
        customModule: {
            customMiddleware: / 加载的中间件函数 /
        }
    }
 *
 */

module.exports = (app) => {
  // 读取 app/middleware/**/**.js 目录下的文件
  const targetPath = path.resolve(app.baseDir, `.${sep}middleware`);
  const fileList = glob.sync(path.resolve(targetPath, `.${sep}**${sep}**.js`));

  const middlewares = {};
  for (const file of fileList) {
    // 截取路径
    let name = path.resolve(file);

    name = name.substring(
      name.lastIndexOf(`middleware${sep}`) + `middleware${sep}`.length,
      name.lastIndexOf("."),
    );

    // 转化路径 '-' -> '大写'
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    // 加载到内存
    let temp = middlewares;
    const names = name.split(sep);
    for (let i = 0, len = names.length; i < len; i++) {
      if (i === len - 1) {
        // 说明是文件
        temp[names[i]] = require(path.resolve(file))(app);
      } else {
        if (!temp[names[i]]) {
          temp[names[i]] = {};
        }
        temp = temp[names[i]];
      }
    }
  }

  // 挂载到 app
  app.middlewares = middlewares;
};
