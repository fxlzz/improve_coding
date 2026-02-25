const path = require("path");
const md5 = require("md5");
const { SIGN_TIMEOUT, CODE_SIGN_ERROR, CODE_SIGN_KEY_NOT_CONFIG } = require("../constant/sgin");
const { BizError } = require("../utils/biz-error");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

/**
 * 验证 API 请求签名
 * 校验不通过时抛出 BizError
 */
module.exports = (app) => {
  return async (ctx, next) => {
    const { path, method } = ctx;
    const { headers } = ctx.request;
    const { s_t: st, s_sign: sSign, s_rand: sRand } = headers;

    if (!path.startsWith("/api/")) {
      await next();
      return;
    }

    // 使用 md5 对称加盐哈希
    const signKey = process.env.SIGN_KEY;
    if (!signKey) {
      throw BizError(CODE_SIGN_KEY_NOT_CONFIG, "签名密钥未配置，请检查环境变量");
    }

    const signature = md5(`${signKey}_${st}_${sRand}`);
    app.logger.info(`[${method} ${path}] - signature: ${signature}`);

    if (!st || !sSign || signature !== sSign || Date.now() - Number(st) > SIGN_TIMEOUT) {
      throw BizError(CODE_SIGN_ERROR, "签名验证失败或API超时");
    }

    await next();
  };
};
