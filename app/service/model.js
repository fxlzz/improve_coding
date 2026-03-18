module.exports = (app) => {
  const BaseService = require("./baseService.js")(app);
  const modelList = require("../model/index.js")(app);

  return class ModelService extends BaseService {
    async getModelList() {
      return modelList;
    }
  };
};
