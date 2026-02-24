const superagent = require("superagent");

module.exports = (app) => {
  return class BaseController {
    constructor() {
      this.app = app;
      this.config = app.config;
      this.curl = superagent;
    }
  };
};
