const path = require("path");
const { sep } = path;

module.exports = (app) => {
  return class ViewController {
    /**
     * 渲染页面
     */
    async renderPage(ctx) {
      await ctx.render(`dist${sep}entry.${ctx.params.page}`);
    }
  };
};
