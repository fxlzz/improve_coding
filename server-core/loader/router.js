const KoaRouter = require("koa-router");
const path = require("path");
const { sep } = path;
const glob = require("glob");
/**
 * router loader
 * @param {object} app Koa实例
 *
 * 将 app/router 下的所有文件都加载到 koaRouter 实例中
 */
module.exports = (app) => {
  const targetPath = path.resolve(app.baseDir, `.${sep}router`);
  const fileList = glob.sync(path.resolve(targetPath, `.${sep}**${sep}**.js`));

  // 注册所有 router 文件
  for (const file of fileList) {
    // modules.export = (app, router) => router.get('xxx', async (ctx, next) => {})
    require(path.resolve(file))(app, router);
  }

  const router = new KoaRouter();

  router.get("*", async (ctx, next) => {
    ctx.status = 302; // 临时重定向
    ctx.redirect(`${app?.options?.index ?? "/"}`);
  });

  // 路由注册到 app 上
  app.use(router.routes());
  app.use(router.allowedMethods());
};
