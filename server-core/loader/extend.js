const path = require("path");
const { sep } = path;
const glob = require("glob");
/**
 * extend loader
 * @param {object} app Koa实例 
 * 
   app/extend
       |
       | -- custom-extend.js
    
    => app.extend.customExtend 
 */
module.exports = (app) => {
  // 读取 app/extend/**.js 的文件
  const targetPath = path.resolve(app.baseDir, `.${sep}extend`);
  const fileList = glob.sync(path.resolve(targetPath, `.${sep}**.js`));

  for (const file of fileList) {
    let name = path.resolve(file);

    // 转化写法 -> '-' 转化为驼峰写法
    name = name.substring(
      name.lastIndexOf(`extend${sep}`) + `extend${sep}`.length,
      name.lastIndexOf("."),
    );
    name = name.replace(/[_-][a-z]/gi, (s) => s.substring(1).toUpperCase());

    // 过滤 app 中相同的 key
    for (const key in app) {
      if (key === name) {
        console.error(`${key} is exist in app`);
        return;
      }
    }

    app[name] = require(path.resolve(file))(app);
  }
};
