module.exports = (app) => {
  const BaseController = require("./baseController.js")(app);

  return class ModelController extends BaseController {
    /**
     * 获取 project 信息, 若传递 proj_key 则返回对应 project item，若未传递，proj_key 则返回全量
     * @param {string} proj_key ctx.request.query
     */
    async getProjectList(ctx) {
      const { model: modelService } = app.service;
      const { proj_key } = ctx.request.query;
      const projectList = await modelService.getProjectList({ proj_key });

      const dtoProjectList = projectList.filter(Boolean).map((proItem) => {
        const { modelKey, key, name, desc, homePage = "" } = proItem;
        return { modelKey, key, name, desc, homePage };
      });

      this.success(ctx, dtoProjectList);
    }

    /**
     * 获取 model 信息
     */
    async getModelList(ctx) {
      const { model: modelService } = app.service;
      const modelList = await modelService.getModelList();

      /** 简化 model 结构
       *  model -> {key, name, desc}
       *  project -> {key, name, desc, homePage}
       */
      const dtoModelList = modelList.reduce((pre, acc) => {
        const { model, project, key } = acc;

        const dtoModel = {
          name: model?.name,
          desc: model?.desc,
          key,
        };

        const dtoProject = {};
        for (const proKey in project) {
          const { key, name, desc, homePage = "" } = project[proKey];
          dtoProject[proKey] = { key, name, desc, homePage };
        }

        pre.push({
          model: dtoModel,
          project: dtoProject,
        });
        return pre;
      }, []);

      this.success(ctx, dtoModelList);
    }
  };
};
