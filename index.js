const Koa = require("koa");

const app = new Koa();

try {
  const port = process.env.PORT || 3003;
  const host = process.env.IP || "0.0.0.0";

  app.listen(port, host);
  console.log(`server running on port: ${port}`);
} catch (e) {
  console.error(e);
}
