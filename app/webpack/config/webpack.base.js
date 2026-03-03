const webpack = require("webpack");
const path = require("path");
const glob = require("glob");

const businessPath = path.resolve(__dirname, "../../", "./pages");
const publicPath = path.resolve(__dirname, "../../public");
const templatePath = path.resolve(__dirname, "../../template");

const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
  // 输出产物配置
  output: {
    filename: "js/[name]_[chunkhash:8].bundle.js",
    path: path.resolve(publicPath, "./dist/prod"),
    publicPath: "/dist/prod/",
    crossOriginLoading: "anonymous",
  },
  // 模块解析配置
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        include: businessPath,
        use: ["babel-loader"],
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
        test: /\.(png|jpeg|gif)(\?.+)?$/,
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
    extensions: [".vue", ".js", ".less"],
    alias: {
      "@pages": path.resolve(businessPath),
      "@common": path.resolve(businessPath, "./common"),
      "@components": path.resolve(businessPath, "./components"),
      "@stores": path.resolve(businessPath, "./stores"),
      "@utils": path.resolve(businessPath, "./utils"),
      "@api": path.resolve(businessPath, "./api"),
    },
  },
  // 插件配置（在合适的时机干预 webpack 解析）
  plugins: [
    // 处理 .vue 文件，与 vue-loader 配合起来用
    new VueLoaderPlugin(),
    // 把第三方库暴露到 window context 下
    new webpack.ProvidePlugin({
      Vue: "vue",
    }),
    // 定义全局变量
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: "true", // 支持 vue 解析 optionsAPI
      __VUE_PROD_DEVTOOLS__: "false", // 解析过程中禁用调式工具
      __VUE_PROD_HYDRTION_MISMATCH_DETAYILS__: "false",
    }),
    // 构建最终产物
    ...htmlWebpackPluginList,
    // 自动删除变动后的文件
    new CleanWebpackPlugin(),
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
          test: /[\\/]pages[\\/]/,
          name: "commons",
          chunks: "all",
          minChunks: 2, // 最少引用次数
          priority: 10,
          reuseExistingChunk: true, // 复用已有的 chunk
        },
      }
    },
  }
};
