module.exports = (app) => {
  const { BizError } = require("../utils/biz-error");
  return (ctx, next) => {
    const { headers } = ctx.request;
    const { path } = ctx;

    // 约定：由 /apo/proj 开头的接口，是需要区分项目的
    if (!path.startsWith("/api/proj")) {
      return next();
    }

    if (headers.proj_key) {
      ctx.projKey = headers.proj_key;
    } else {
      throw BizError(441, "缺失proj_key");
    }

    next();
  };
};
