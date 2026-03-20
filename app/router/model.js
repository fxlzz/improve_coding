module.exports = (app, router) => {
  const { model: modelController } = app.controller;

  router.get("/api/project/list", modelController.getProjectList.bind(modelController));

  router.get("/api/model", modelController.getModelList.bind(modelController));
};
