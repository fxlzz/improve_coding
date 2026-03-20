/**
 * API路径(必须以api开头) -> { 方法(遵循RESTFUL规范) : { 参数校验(query, params, header, body) } }
 *
 * 参数校验描述 --> 采用 json-schema
 * https://json-schema.org/docs
 */
module.exports = {
  "/api/project/list": {
    get: {
      query: {
        type: "object",
        properties: {
          proj_key: {
            type: "string",
          },
        },
      },
    },
  },
  "/api/model": {
    get: {},
  },
};
