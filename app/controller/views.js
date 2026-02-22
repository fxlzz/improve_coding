const path = require("path");
const { sep } = path;

module.exports = (app) => {
  return class ViewController {
    /**
     * 渲染页面
     */
    async renderPage(ctx) {
      await ctx.render(`output${sep}views.${ctx.params.page}`);
    }
  };
};
