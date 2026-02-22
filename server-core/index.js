const Koa = require("koa");
const path = require("path");
const { sep } = path;
const env = require("./env");

// 加载解析 loader
const middlewareLoader = require("./loader/middleware");
const routerSchemaLoader = require("./loader/router-schema");
const routerLoader = require("./loader/router");
const controllerLoader = require("./loader/controller");
const serviceLoader = require("./loader/service");
const configLoader = require("./loader/config");
const extendLoader = require("./loader/extend");

module.exports = {
  /**
   * 启动项目
   * @param options 项目配置
   * @param options.name 项目名称
   * @param optiosn.index 项目根目录
   */
  start(options = {}) {
    const app = new Koa();

    try {
      const port = process.env.PORT || 3003;
      const host = process.env.IP || "0.0.0.0";

      // 挂载项目配置项
      app.options = options;

      const baseDir = path.resolve(__dirname, `.${path.sep}app`);
      app.baseDir = baseDir;

      // 加载环境
      app.env = env();
      console.log(`------ [start] env: ${app.env.get()} ------`);

      // 加载loader
      middlewareLoader(app);
      console.log(`------ [loader] middleware done  ------`);

      routerSchemaLoader(app);
      console.log(`------ [loader] router-schema done  ------`);

      controllerLoader(app);
      console.log(`------ [loader] controller done  ------`);

      serviceLoader(app);
      console.log(`------ [loader] service done  ------`);

      configLoader(app);
      console.log(`------ [loader] config done  ------`);

      extendLoader(app);
      console.log(`------ [loader] extend done  ------`);

      // 注册全局中间件
      try {
        require(path.resolve(process.cwd(), `.${sep}app${sep}middleware.js`))(app);
        console.log("------ [loader] global middleware done ------=");
      } catch (error) {
        console.log("[exception] : there is on global middleware file.");
      }

      // 注册路由
      routerLoader(app);
      console.log(`------ [loader] router done  ------`);

      app.listen(port, host);
      console.log(`server running on port: ${port}`);
    } catch (e) {
      console.error(e);
    }
  },
};
