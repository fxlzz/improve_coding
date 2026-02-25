/**
 * 业务错误：带 code 的 Error，由 error-handler 按统一格式返回给前端
 * @param {number} code 业务错误码
 * @param {string} message 错误信息
 * @returns {Error}
 */
function BizError(code, message) {
  const err = new Error(message);
  err.code = code;
  return err;
}

module.exports = { BizError };
