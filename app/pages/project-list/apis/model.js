import curl from "../../common/curl";

export async function fetchModelList() {
  return await curl({
    url: "/api/model",
    method: "GET",
    errorMessage: "获取model失败",
  });
}
