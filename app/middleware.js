const koaNunjucks = require("koa-nunjucks-2");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const { sep } = path;

module.exports = (app) => {
  // 配置静态文件目录
  app.use(koaStatic(path.resolve(__dirname, `.${sep}public`)));

  // 配置模板引擎
  app.use(
    koaNunjucks({
      ext: "html",
      path: path.resolve(__dirname, `.${sep}public`),
      nunjucksConfig: {
        noCache: true,
        trimBlocks: true,
      },
    }),
  );

  // 解析请求体
  app.use(
    bodyParser({
      formLimit: "100mb",
      enableTypes: ["json", "form", "text"],
    }),
  );

  // API 请求签名验证
  app.use(app.middlewares.apiSignVerify);

  // 错误处理
  app.use(app.middlewares.errorHandler);
};
