import curl from "@common/curl.js";

/**
 * 获取 project/list 项目列表
 * @param {object} options 可选配置 - 不传 - 后端全量返回
 * @param {string} options.proj_key 具体项目 key 值
 */
export const fetchProjectList = async () => {
  const res = await curl({
    method: "get",
    url: "/api/project/list",
    errorMessage: "获取项目列表失败",
  });

  if (!res || !res.data) {
    return;
  }

  return res.data;
};

/**
 * 根据 proj_key 获取 project 项目配置
 * @param {object} options
 * @param {string} options.proj_key 获取项目的 key 值
 */
export const fetchProjectConfig = async ({ proj_key }) => {
  const res = await curl({
    method: "get",
    url: "/api/project",
    query: {
      proj_key,
    },
    errorMessage: "获取项目配置失败",
  });

  if (!res || !res.data) {
    return;
  }

  return res.data;
};
