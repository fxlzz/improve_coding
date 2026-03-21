/**
 * model 相关接口的测试用例
 * 新增测试用例写在最后面（方便查看结果）
 * npm run test 执行测试
 */

const assert = require("assert");
const supertest = require("supertest");
const md5 = require("md5");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", "app", ".env") });
const core = require("../../server-core");

const signKey = process.env.SIGN_KEY;
const st = Date.now();
const sRand = Math.random().toString(36).substring(2, 15);

describe("测试 model 相关接口", function () {
  this.timeout(60000);

  let request;
  let modelList = [];
  let projectList = [];

  it("启动服务", async () => {
    const app = await core.start();
    modelList = require("../../app/model/index.js")(app);
    modelList.forEach((modelItem) => {
      const { project } = modelItem;
      for (const key in project) {
        projectList.push(project[key]);
      }
    });
    request = supertest(app.listen());
  });

  it("GET /api/project/list without proj_key", async () => {
    let tmpRequest = request.get("/api/project/list");
    tmpRequest = tmpRequest.set("s_t", st);
    tmpRequest = tmpRequest.set("s_sign", md5(`${signKey}_${st}_${sRand}`));
    tmpRequest = tmpRequest.set("s_rand", sRand);

    const res = await tmpRequest;
    assert(res.body.success === true);
    assert(res.body.data.length === projectList.length);

    for (const item of res.body.data) {
      assert(item.key);
      assert(item.modelKey);
      assert(item.name);
      assert(item.desc !== undefined);
      assert(item.homePage !== undefined);
    }
  });

  it("GET /api/project/list with proj_key", async () => {
    const projKey = projectList[Math.floor(Math.random() * projectList.length)].key;

    let tmpRequest = request.get("/api/project/list");
    tmpRequest = tmpRequest.set("s_t", st);
    tmpRequest = tmpRequest.set("s_sign", md5(`${signKey}_${st}_${sRand}`));
    tmpRequest = tmpRequest.set("s_rand", sRand);
    tmpRequest = tmpRequest.query({
      proj_key: projKey,
    });

    const res = await tmpRequest;
    assert(res.body.success === true);
    assert(res.body.data.length === 1);

    for (const item of res.body.data) {
      assert(item.key);
      assert(item.modelKey);
      assert(item.name);
      assert(item.desc !== undefined);
      assert(item.homePage !== undefined);
    }
  });

  it("GET /api/model", async () => {
    let tmpRequest = request.get("/api/model");
    tmpRequest = tmpRequest.set("s_t", st);
    tmpRequest = tmpRequest.set("s_sign", md5(`${signKey}_${st}_${sRand}`));
    tmpRequest = tmpRequest.set("s_rand", sRand);

    const res = await tmpRequest;
    assert(res.body.success === true);

    for (const modelItem of res.body.data) {
      assert(modelItem.model);
      assert(modelItem.model.key);
      assert(modelItem.model.name);

      assert(modelItem.project);
      for (const projKey in modelItem.project) {
        assert(modelItem.project[projKey].key);
        assert(modelItem.project[projKey].name);
      }
    }
  });

  it("GET /api/project with error proj_key", async () => {
    let tmpRequest = request.get("/api/project");
    tmpRequest = tmpRequest.set("s_t", st);
    tmpRequest = tmpRequest.set("s_sign", md5(`${signKey}_${st}_${sRand}`));
    tmpRequest = tmpRequest.set("s_rand", sRand);
    tmpRequest = tmpRequest.query({
      proj_key: "xxxxxxxxxx",
    });

    const res = await tmpRequest;
    assert(res.body.success === false);
    assert(res.body.message.includes("获取项目异常"));
    assert(res.body.code === 500);
  });

  it("GET /api/project without proj_key", async () => {
    let tmpRequest = request.get("/api/project");
    tmpRequest = tmpRequest.set("s_t", st);
    tmpRequest = tmpRequest.set("s_sign", md5(`${signKey}_${st}_${sRand}`));
    tmpRequest = tmpRequest.set("s_rand", sRand);
    const res = await tmpRequest;

    assert(res.body.success === false);
    assert(res.body.message.includes("API 参数校验失败"));
    assert(res.body.code === 442);
  });

  it("GET /api/project with right proj_key", async () => {
    for (let i = 0; i < projectList.length; i++) {
      const project = projectList[i];
      const { key: projKey } = project;

      let tmpRequest = request.get("/api/project");
      tmpRequest = tmpRequest.set("s_t", st);
      tmpRequest = tmpRequest.set("s_sign", md5(`${signKey}_${st}_${sRand}`));
      tmpRequest = tmpRequest.set("s_rand", sRand);
      tmpRequest = tmpRequest.query({
        proj_key: projKey,
      });

      const res = await tmpRequest;
      const resData = res.body.data;
      assert(res.body.success === true);

      assert(resData.name);
      assert(resData.desc !== undefined);
      assert(resData.homePage !== undefined);
      assert(resData.menu);

      resData.menu.forEach((menuItem) => {
        checkMenuItem(menuItem);
      });
    }

    // 递归检查 menu 项
    function checkMenuItem(menuItem) {
      console.log(`--------- check menuKey: ${menuItem.key} ---------`);
      assert(menuItem.key);
      assert(menuItem.name);
      assert(menuItem.menuType !== undefined);

      if (menuItem.menuType === "group") {
        assert(menuItem.submenu !== undefined);
        menuItem.submenu.forEach((submenuItem) => checkMenuItem(submenuItem));
      } else {
        checkModule(menuItem);
      }
    }

    function checkModule(menuItem) {
      assert(menuItem.moduleType !== undefined);

      if (menuItem.moduleType === "sider") {
        assert(menuItem.siderConfig.menu);
        menuItem.siderConfig.menu.forEach((menuItem) => checkMenuItem(menuItem));
      }
      if (menuItem.moduleType === "schema") {
        assert(menuItem.schemaConfig.api);
      }
      if (menuItem.moduleType === "iframe") {
        assert(menuItem.iframeConfig.path);
      }
      if (menuItem.moduleType === "custom") {
        assert(menuItem.customConfig.path);
      }
    }
  });
});
