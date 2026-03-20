module.exports = (app) => {
  const BaseService = require("./baseService.js")(app);
  const modelList = require("../model/index.js")(app);

  return class ModelService extends BaseService {
    /**
     * 获取 project 信息, 若传递 proj_key 则返回对应 project item，若未传递，proj_key 则返回全量
     */
    getProjectList({ proj_key }) {
      return modelList.reduce((preList, modelItem) => {
        const { project = {} } = modelItem || {};

        if (proj_key) {
          if (!project[proj_key]) return preList;
          preList.push(project[proj_key]);
          return preList;
        }

        // 未传 proj_key：返回全量
        for (const key in project) {
          preList.push(project[key]);
        }

        return preList;
      }, []);
    }

    /**
     * 获取 model 信息
     */
    async getModelList() {
      return modelList;
    }
  };
};
