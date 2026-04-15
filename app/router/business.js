module.exports = (app, router) => {
  const { business: businessController } = app.controller;

  router.get(
    "/api/proj/project_name/list",
    businessController.getProjectNameList.bind(businessController),
  );
  router.get("/api/proj/product/list", businessController.getList.bind(businessController));
  router.delete("/api/proj/product/", businessController.remove.bind(businessController));
};
