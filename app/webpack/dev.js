// 使用 express 启动开发服务器
const express = require("express");
const path = require("path");
const webpack = require("webpack");
const consoler = require("consoler");

// hmr 中间件
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");

// 获取 webpack 开发环境配置和开发服务器配置
const { webpackDevConfig, DEV_SERVER_CONFIG } = require("./config/webpack.dev");

consoler.info("请等待，webpack 开发服务器正在启动...");

const app = express();
const complier = webpack(webpackDevConfig);

// 指定静态文件目录
app.use(express.static(path.resolve(__dirname, "../public/dist/")));

// 配置监听中间件（dev）
app.use(devMiddleware(complier, {
    // 不加入内存的文件
    writeToDisk: filename => filename.endsWith(".html"),
    // 资源目录
    publicPath: webpackDevConfig.output.publicPath,
    // 跨域
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization",
    },
}))

// 配置通知中间件（hot）
app.use(hotMiddleware(complier, {
    path: `/${DEV_SERVER_CONFIG.HMR_PATH}`,
    log: () => { }
}))

const port = DEV_SERVER_CONFIG.PORT;
app.listen(port, () => {
    console.log(`开发服务器正在运行： ${port}`);
});