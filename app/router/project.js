module.exports = (app, router) => {
  const { project: projectController } = app.controller;

  router.get("/api/projects", projectController.getProjects.bind(projectController));
};
