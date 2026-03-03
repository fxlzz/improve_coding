const webpack = require("webpack");
const webpackConfig = require("./config/webpack.base.js");

/**
 * @param {Error} err 错误信息
 * @param {object} stats webpack 的统计信息（打包过程的各种细节）
 */
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log(err);
    // throw err;
  }
  process.stdout.write(
    `${stats.toString({
      colors: true, // 在控制台输出彩色信息
      modules: false, // 不显示每个模块的打包信息
      children: false, // 不显示子项目的情况
      chunks: false, // 不显示块信息
      chunkModules: true, // 显示每个块的模块信息
    })}`,
  );
});
