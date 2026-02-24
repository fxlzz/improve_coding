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

  const router = new KoaRouter();

  // 注册所有 router 文件
  for (const file of fileList) {
    require(path.resolve(file))(app, router);
  }

  const indexPath = app?.options?.index ?? "/";
  router.get(/(.*)/, async (ctx, next) => {
    if (ctx.path === indexPath || ctx.path === "/") {
      return next();
    }
    ctx.status = 302;
    ctx.redirect(indexPath);
  });

  // 路由注册到 app 上
  app.use(router.routes());
  app.use(router.allowedMethods());
};
