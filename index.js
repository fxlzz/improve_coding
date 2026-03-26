const serverCore = require("./server-core");

serverCore.start({
  name: "core",
  index: "/views/project-list",
});
