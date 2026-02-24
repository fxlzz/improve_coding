module.exports = (app) => {
  const BaseController = require("./baseController")(app);

  return class ProjectController extends BaseController {
    /**
     *  获取项目列表
     * @param {object} ctx
     */
    async getProjects(ctx) {
      const { project: projectService } = app.service;
      const projectList = await projectService.getProjects();

      this.success(ctx, projectList);
    }
  };
};
