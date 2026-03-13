import md5 from "md5";
import { ElMessage } from "element-plus";

/**
 * API 请求函数
 * @param {object} options 请求配置
 * @param {string} options.url 请求路径
 * @param {string} options.method 请求方法
 * @param {object} options.query 请求参数
 * @param {object} options.headers 请求头
 * @param {object} options.body 请求体
 * @param {number} options.timeout 请求超时时间
 * @param {string} options.responseType 响应类型
 * @param {string} options.errorMessage 错误信息
 */
const curl = ({
    url = "",
    method = "post",
    query = {},
    headers = {},
    body = {},
    timeout = 60000,
    responseType = "json",
    errorMessage = "网络异常",
}) => {

    const signKey = "asdf2983rsdhfk784oh8s99aojdisj";
    const st = Date.now();
    const sRand = Math.random().toString(36).substring(2, 15);
    const signature = md5(`${signKey}_${st}_${sRand}`);

    const settings = {
        url,
        method,
        params: query,
        data: body,
        timeout,
        responseType,
        headers: {
            ...headers,
            "s_t": st,
            "s_sign": signature,
            "s_rand": sRand,
        }
    }

    return axios.request(settings).then((response) => {
        const resData = response.data || {};

        // controller 返回数据
        const { success, code, message } = resData;

        // 失败处理
        if (!success) {
            if (code === 442) {
                ElMessage.error("参数校验失败");
            } else if (code === 445 || code === 446) {
                ElMessage.error("请求非法或超时");
            } else if (code === 500) {
                ElMessage.error(message);
            } else if (code === 50000) {
                ElMessage.error("服务器异常");
            } else {
                ElMessage.error(errorMessage);
            }

            return Promise.reject(resData);
        }

        // 成功返回数据
        const { data, metadata } = resData;
        return Promise.resolve({ data, metadata });

    }).catch((error) => {
        const { message } = error;

        if (message.includes("timeout")) {
            return Promise.resolve({
                message: "请求超时",
                code: 504
            })
        };

        return Promise.resolve(error);
    })
}

export default curl;