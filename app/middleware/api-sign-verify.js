const path = require("path");
const md5 = require("md5");
const { SIGN_TIMEOUT } = require("../constant/sgin");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

/**
 * 验证 API 请求签名
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
    const signature = md5(`${signKey}_${st}_${sRand}`);
    app.logger.info(`[${method} ${path}] - signature: ${signature}, sSign: ${sSign}`);

    if (!st || !sSign || signature !== sSign || Date.now() - Number(st) > SIGN_TIMEOUT) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        code: 445,
        message: "签名验证失败或API超时",
      };
      return;
    }

    await next();
  };
};
