const path = require("path");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base");

const { publicPath } = require("./path");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge.smart(webpackBaseConfig, {
    mode: "production",
    output: {
        clean: true, // 相当于 CleanWebpackPlugin
        // contenthash 使得浏览器缓存失效
        filename: "js/[name]_[contenthash:8].bundle.js",
        path: path.resolve(publicPath, "./dist/prod"),
        publicPath: "/dist/prod/",
        crossOriginLoading: "anonymous",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
            },
        ]
    },
    plugins: [
        // 提取 CSS 代码
        new MiniCssExtractPlugin({
            filename: "css/[name]_[contenthash:8].bundle.css",
        }),
    ],
    optimization: {
        splitChunks: { chunks: "all" },
        runtimeChunk: "single", // 提取 runtime 代码
        minimizer: [
            new CssMinimizerPlugin(), // 压缩 CSS 代码
            new TerserPlugin({
                minify: TerserPlugin.swcMinify, // 压缩 JS 代码
                terserOptions: {
                    compress: {
                        drop_console: true, // 删除 console.log
                    },
                },
            }),
        ],
    },
});