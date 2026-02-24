const { LOCAL, BETA, PROD } = require("./constant/env");

module.exports = (app) => {
  return {
    // 是否为本地环境
    isLocal() {
      return process.env._ENV === LOCAL;
    },

    // 是否为测试环境
    isBeta() {
      return process.env._ENV === BETA;
    },

    // 是否为生产环境
    isProd() {
      return process.env._ENV === PROD;
    },

    // 获取当前环境
    get() {
      return process.env._ENV ?? LOCAL;
    },
  };
};
