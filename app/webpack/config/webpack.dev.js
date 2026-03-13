const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const webpackBaseConfig = require("./webpack.base.js");

const { publicPath } = require("./path");

// 开发服务器
const DEV_SERVER_CONFIG = {
    HOST: "127.0.0.1",
    PORT: 9002,
    HMR_PATH: "__webpack_hmr", // 官方规定，hmr客户端路径
    TIMEOUT: 20000,
    RELOAD: true,
}

// 注入hmr客户端
const { HOST, PORT, HMR_PATH, TIMEOUT, RELOAD } = DEV_SERVER_CONFIG;
Object.keys(webpackBaseConfig.entry).forEach(key => {
    // 第三方库改动较少，不需要注入hmr客户端
    if (key !== "vendor") {
        webpackBaseConfig.entry[key] = [
            webpackBaseConfig.entry[key],
            `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/${HMR_PATH}&timeout=${TIMEOUT}&reload=${RELOAD}`,
        ]
    }

})

const webpackDevConfig = merge.smart(webpackBaseConfig, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    output: {
        clean: true,
        filename: "js/[name].bundle.js",
        path: path.resolve(publicPath, "./dist/dev"),
        publicPath: `http://${HOST}:${PORT}/public/dist/dev/`,
    },
    // 开发环境插件
    plugins: [
        // 该插件允许在应用程序运行时替换模块
        new webpack.HotModuleReplacementPlugin({
            multiStep: true,
        }),
    ]
})

module.exports = {
    // webpack 开发环境配置
    webpackDevConfig,
    // 开发服务器配置
    DEV_SERVER_CONFIG
}
