module.exports = {
  "/api/porj/product/list": {
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
  "/api/proj/product": {
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
  "/api/proj/project_name/list": {
    get: {},
  },
};
