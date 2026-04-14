module.exports = (app) => {
  const BaseController = require("./baseController.js")(app);
  return class BusinessController extends BaseController {
    getList(ctx) {
      const data = [
        {
          product_id: "1",
          product_name: `${ctx.projKey}-纸巾`,
          price: 39.9,
          inventory: 9999,
          create_time: "2030",
        },
        {
          product_id: "2",
          product_name: "衣服",
          price: 89,
          inventory: 9999,
          create_time: "1877",
        },
        {
          product_id: "3",
          product_name: "鞋子",
          price: 79.9,
          inventory: 9999,
          create_time: "2020",
        },
      ];
      this.success(ctx, data, {
        total: 3,
      });
    }

    remove(ctx) {
      const { product_id } = ctx.request.body;
      this.success(ctx, {
        proj_key: ctx.projKey,
        product_id,
      });
    }
  };
};
