module.exports = {
  "/api/product/list": {
    get: {
      query: {
        type: "object",
        properties: {
          page: {
            type: "string",
          },
          size: {
            type: "string",
          },
        },
        requried: ["page", "size"],
      },
    },
  },
  "/api/product": {
    delete: {
      body: {
        type: "object",
        properties: {
          product_id: {
            type: "string",
          },
        },
      },
      requried: ["product_id"],
    },
  },
};
