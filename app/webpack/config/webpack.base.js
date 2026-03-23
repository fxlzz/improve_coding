const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const { businessPath, publicPath, templatePath } = require("./path");

const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entryList = {};
const htmlWebpackPluginList = [];
const entryPath = path.join(businessPath, "/**/entry.*.js");
glob.sync(entryPath).forEach((file) => {
  // file 是路绝对路径
  const entryName = path.basename(file, ".js");
  entryList[entryName] = file;

  htmlWebpackPluginList.push(
    new HtmlWebpackPlugin({
      // 产物的输出目录
      filename: path.resolve(publicPath, "./dist", `./${entryName}.html`),
      // 指定要使用的模板
      template: path.resolve(templatePath, "./index.html"),
      // 要注入的代码块
      chunks: [entryName],
    }),
  );
});

// webpack 配置
module.exports = {
  // 入口配置
  entry: entryList,
  // 缓存配置
  cache: {
    type: "filesystem", // 持久化缓存
    buildDependencies: {
      config: [__filename], //当配置文件修改时，整个缓存失效
    },
  },
  // 模块解析配置
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        include: businessPath,
        exclude: /\.vue$/,
        use: "swc-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|jpeg|gif)(\?.+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 300,
            esModule: false,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: ["file-loader"],
      },
    ],
  },
  // 配置解析模块的具体行为
  resolve: {
    extensions: [".vue", ".js", ".less", ".json"],
    alias: {
      "@pages": path.resolve(businessPath),
      "@common": path.resolve(businessPath, "./common"),
      "@components": path.resolve(businessPath, "./components"),
      "@stores": path.resolve(businessPath, "./stores"),
      "@utils": path.resolve(businessPath, "./utils"),
      "@apis": path.resolve(businessPath, "./apis"),
      "@widgets": path.resolve(businessPath, "./widgets"),
    },
  },
  // 插件配置（在合适的时机干预 webpack 解析）
  plugins: [
    // 处理 .vue 文件，与 vue-loader 配合起来用
    new VueLoaderPlugin(),
    // 把第三方库暴露到 window context 下
    new webpack.ProvidePlugin({
      Vue: "vue",
      axios: "axios",
      _: "lodash",
    }),
    // 定义全局变量
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: "true", // 支持 vue 解析 optionsAPI
      __VUE_PROD_DEVTOOLS__: "false", // 解析过程中禁用调式工具
    }),
    // 构建最终产物
    ...htmlWebpackPluginList,
  ],
  // 优化打包/构建
  optimization: {
    /**
     * 代码分割
     * 1. vendor 改动很少的一些第三方库
     * 2. commons 业务中公共的代码
     * 3. entry 业务中每个页面的入口代码
     */
    splitChunks: {
      chunks: "all", // 同步和异步的模块都进行分割
      maxAsyncRequests: 10, // 最大异步加载请求并行数
      maxInitialRequests: 10, // 最大初始加载请求并行数
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
          priority: 20, // 优先级越高，越先被分割
          enforce: true, // 强制分割
          reuseExistingChunk: true, // 复用已有的 chunk
        },
        commons: {
          test: /[\\/]common|widgets[\\/]/,
          name: "commons",
          chunks: "all",
          minChunks: 2, // 最少引用次数
          priority: 10,
          reuseExistingChunk: true, // 复用已有的 chunk
        },
      },
    },
  },
};
