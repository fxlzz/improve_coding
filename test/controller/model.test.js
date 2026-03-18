const assert = require("assert");
const supertest = require("supertest");
const md5 = require("md5");
const core = require("../../server-core");

const signKey = process.env.SIGN_KEY;
const st = Date.now();
const sRand = Math.random().toString(36).substring(2, 15);
const signature = md5(`${signKey}_${st}_${sRand}`);

describe("测试 model 相关接口", function () {
  this.timeout(60000);

  let request;

  it("启动服务", async () => {
    const app = await core.start();
    request = supertest(app.listen());
  });

  it("GET /api/model", async () => {
    let tmpRequest = request.get("/api/model");
    tmpRequest = tmpRequest.set("s_t", st);
    tmpRequest = tmpRequest.set("s_sign", signature);
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
