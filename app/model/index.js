const _ = require("lodash");
const path = require("path");
const glob = require("glob");
const { sep } = path;

const projectExtendModel = (model, project) => {
  return _.mergeWith({}, model, project, (modelVal, projVal) => {
    if (Array.isArray(modelVal) && Array.isArray(projVal)) {
      let result = [];
      // project key 存在，model key 也存在 -> projVal key 值覆盖 modelVal
      // project key 存在，model key 不存在 -> 增加
      // model key 存在，但 project key 不存在 -> 保留 model key

      for (let i = 0; i < modelVal.length; i++) {
        let modelItem = modelVal[i];
        const projItem = projVal.find((projItem) => projItem.key === modelItem.key);
        result.push(projItem ? projectExtendModel(modelItem, projItem) : modelItem);
      }

      for (let i = 0; i < projVal.length; i++) {
        const projItem = projVal[i];
        const modelItem = modelVal.find((modelItem) => modelItem.key === projItem.key);
        if (!modelItem) {
          result.push(projItem);
        }
      }

      return result;
    }
  });
};

/**
 * 用于解析 model 目录下的文件
 * 返回如下的数据结构：
 * [{
 *   model: $(modelKey)
 *   project: {
 *      projKey1: $(projKey1) key: projKey1,
 *      projKey2: $(projKey2) key: projKey2
 *   },
 *   key: modelKey
 *  }]
 */

module.exports = (app) => {
  const modelList = [];
  const filePath = path.resolve(app.baseDir, `.${sep}model`);
  const fileList = glob.sync(path.resolve(filePath, `.${sep}**${sep}**.js`));
  fileList.forEach((file) => {
    if (file.includes("index.js")) return;
    const type = file.includes("project") ? "project" : "model";

    if (type === "project") {
      const modelKey = file.match(/\/model\/(.*?)\/project/)?.[1];
      const projKey = file.match(/\/project\/(.*?)\.js/)?.[1];
      let modelItem = modelList.find((item) => item?.key === modelKey);
      if (!modelItem) {
        modelItem = {};
        modelList.push(modelItem);
      }

      if (!modelItem.project) {
        modelItem.project = {};
      }

      modelItem.project[projKey] = require(path.resolve(file));
      modelItem.project[projKey].key = projKey;
    }

    if (type === "model") {
      const modelKey = file.match(/\/model\/(.*?)\/model\.js/)?.[1];
      let modelItem = modelList.find((item) => item?.key === modelKey);
      if (!modelItem) {
        modelItem = {};
        modelList.push(modelItem);
      }
      modelItem.model = require(path.resolve(file));
      modelItem.key = modelKey;
    }
  });

  // 让 project 中的内容继承 model
  modelList.forEach((item) => {
    const { model, project } = item;
    for (const key in project) {
      project[key] = projectExtendModel(model, project[key]);
    }
  });

  return modelList;
};
