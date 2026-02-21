const path = require("path");
const { sep } = path;
/**
 * config loader
 * @param {object} app Koa实例
 *
 * 根据不同开发环境，读取不同的 config
 *
 * 默认环境 -> config/config.default.js
 * 开发环境 -> config/config.local.js
 * 测试环境 -> config/config.beta.js
 * 生产环境 -> config/config.prod.js
 */
module.exports = (app) => {
  // 读取 config 目录
  const targetPath = path.resolve(process.cwd(), `.${sep}config`);

  // 获取 config.default 文件
  let defaultConfig = {};
  try {
    defaultConfig = require(path.resolve(targetPath, `.${sep}config.default.js`));
  } catch (error) {
    console.error("[exception]: there is no default config file.");
  }

  // 判断当前环境
  let envConfig = {};
  if (app.env.isLocal()) {
    // 开发环境
    envConfig = require(path.resolve(targetPath, `.${sep}config.local.js`));
  } else if (app.env.isBeta()) {
    // 测试环境
    envConfig = require(path.resolve(targetPath, `.${sep}config.beta.js`));
  } else if (app.env.isProd()) {
    // 生产环境
    envConfig = require(path.resolve(targetPath, `.${sep}config.prod.js`));
  }

  // 合并配置文件
  app.config = Object.assign({}, defaultConfig, envConfig);
};
