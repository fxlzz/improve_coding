module.exports = (app, router) => {
  const { views: viewController } = app.controller;

  router.get("/views/:page", viewController.renderPage.bind(viewController));
};
