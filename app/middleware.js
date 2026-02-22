const koaNunjucks = require("koa-nunjucks-2");
const path = require("path");
const { sep } = path;

module.exports = (app) => {
  app.use(
    koaNunjucks({
      ext: "html",
      path: path.resolve(__dirname, `.${sep}public`),
      nunjucksConfig: {
        noCache: true,
        trimBlocks: true,
      },
    }),
  );
};
