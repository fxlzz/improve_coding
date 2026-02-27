module.exports = (app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const { code, message } = error;

      app.logger.info(error);
      app.logger.error("-- [exception] --: ", error);
      app.logger.error("-- [exception] --: ", message);

      if (message && message.includes("template not found")) {
        ctx.status = 404;
        ctx.body = "页面不存在";
        return;
      }

      const isBizError = Number.isFinite(code);
      const body = {
        success: false,
        code: isBizError ? code : 50000,
        message: isBizError ? message || "请求失败" : "服务器异常",
      };

      ctx.status = 200;
      ctx.body = body;
    }
  };
};
