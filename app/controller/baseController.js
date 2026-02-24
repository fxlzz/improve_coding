module.exports = (app) => {
  return class BaseController {
    constructor() {
      this.app = app;
      this.config = app.config;
    }

    /**
     * API 成功响应 返回的数据格式
     * @param {object} ctx - Koa 上下文对象
     * @param {object} data - 需要返回的数据
     * @param {object} metadata - 额外的元数据
     */
    success(ctx, data = [], metadata = {}) {
      ctx.status = 200;
      ctx.body = {
        success: true,
        data,
        metadata,
      };
    }

    /**
     * API 失败响应 返回的数据格式
     * @param {object} ctx - Koa 上下文对象
     * @param {object} message - 错误信息
     * @param {object} code - 错误码
     */
    fail(ctx, message = "", code = 500) {
      ctx.body = {
        success: false,
        message,
        code,
      };
    }
  };
};
