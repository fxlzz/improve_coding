module.exports = (app, router) => {
  const { model: modelController } = app.controller;

  router.get("/api/model", modelController.getModelList.bind(modelController));
};
