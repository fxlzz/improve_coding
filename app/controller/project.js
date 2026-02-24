module.exports = (app) => {
  return class ProjectController {
    /**
     *  获取项目列表
     * @param {object} ctx
     */
    async getProjects(ctx) {
      const { project: projectService } = app.service;
      const res = await projectService.getProjects();

      ctx.stauts = 200;
      ctx.body = {
        sucess: true,
        data: res,
        message: "获取项目列表成功",
      };
    }
  };
};
