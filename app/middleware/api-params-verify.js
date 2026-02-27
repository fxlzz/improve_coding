const { BizError } = require("../utils/biz-error");
const Ajv = require("ajv");
const ajv = new Ajv();

const $schema = "http://json-schema.org/draft-07/schema#";

module.exports = (app) => {
  return async (ctx, next) => {
    const { path, method, params } = ctx;
    const { headers, body, query } = ctx.request;

    if (!path.startsWith("/api/")) {
      return await next();
    }

    app.logger.info(
      `[${method} ${path}] - params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`,
    );

    const schema = app.routerSchema[path]?.[method.toLowerCase()];

    if (!schema) {
      return await next();
    }

    let valid = true;

    let validate = null;

    // 校验 headers
    if (valid && headers && schema.headers) {
      schema.headers.$schema = $schema;
      validate = ajv.compile(schema.headers);
      valid = validate(headers);
    }

    // 校验 query
    if (valid && query && schema.query) {
      schema.query.$schema = $schema;
      validate = ajv.compile(schema.query);
      valid = validate(query);
    }

    // 校验 body
    if (valid && body && schema.body) {
      schema.body.$schema = $schema;
      validate = ajv.compile(schema.body);
      valid = validate(body);
    }

    // 校验 params
    if (valid && params && schema.params) {
      schema.params.$schema = $schema;
      validate = ajv.compile(schema.params);
      valid = validate(params);
    }

    if (!valid) {
      app.logger.error(
        `[${method} ${path}] - API 参数校验失败: ${ajv.errorsText(validate.errors)}`,
      );
      throw BizError(442, `API 参数校验失败: ${ajv.errorsText(validate.errors)}`);
    }

    await next();
  };
};
