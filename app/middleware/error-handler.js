module.exports = (app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const { message } = error;

      app.logger.info(error);
      app.logger.error("-- [exception] --: ", error);
      app.logger.error("-- [exception] --: ", message);

      if (message && message.includes("template not found")) {
        ctx.status = 404;
        ctx.body = "页面不存在";
        return;
      }

      const body = {
        success: false,
        code: 50000,
        message: "服务器异常",
      };

      ctx.status = 200; // http 请求没问题，服务器逻辑有问题
      ctx.body = body;
    }
  };
};
