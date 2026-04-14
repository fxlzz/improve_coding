const path = require("path");
const { sep } = path;

module.exports = (app) => {
  return class ViewController {
    /**
     * 渲染页面
     */
    async renderPage(ctx) {
      const { params, query } = ctx.request;

      app.logger.info(
        `[viewRouter] - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}}`,
      );

      await ctx.render(`dist${sep}entry.${ctx.params.page}`);
    }
  };
};
