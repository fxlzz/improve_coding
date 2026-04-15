module.exports = (app) => {
  const BaseController = require("./baseController.js")(app);
  return class BusinessController extends BaseController {
    getProjectNameList(ctx) {
      this.success(ctx, [
        {
          label: "全部",
          value: "all",
        },
        {
          label: `${ctx.projKey}-纸巾`,
          value: "zhijin",
        },
        {
          label: `衣服`,
          value: "yifu",
        },
        {
          label: "鞋子",
          value: "xiezi",
        },
      ]);
    }

    getList(ctx) {
      const { product_name } = ctx.request.query;
      let data = [
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

      if (product_name && product_name !== "all") {
        data = data.filter((item) => item.product_name === product_name);
      }

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
