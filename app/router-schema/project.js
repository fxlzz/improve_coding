module.exports = {
  "/api/projects": {
    get: {
      // json-schema
      query: {
        type: "object",
        properties: {
          proj_key: {
            type: "string",
          },
        },
        required: ["proj_key"],
      },
    },
  },
};
