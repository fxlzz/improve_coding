const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.js");

module.exports = merge.smart(webpackBaseConfig, {
    mode: "development",

})
