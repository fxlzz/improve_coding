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
    const projKeyList = projectList.find((item) => item.key === projKey);
    const projKeyListDto = {
      modelKey: projKeyList.modelKey,
      key: projKeyList.key,
      name: projKeyList.name,
      desc: projKeyList.desc,
      homePage: projKeyList.homePage ?? "",
    };

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
      Object.keys(item).forEach((key) => {
        assert(item[key] === projKeyListDto[key]);
      });
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
});
