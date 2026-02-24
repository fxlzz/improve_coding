module.exports = (app) => {
  return class ProjectService {
    /**
     * 获取项目列表
     * @returns {Promise<Array>} 项目列表
     */
    async getProjects() {
      // 模拟从数据库获取项目列表
      const projects = [
        { id: 1, name: "项目A", description: "这是项目A的描述" },
        { id: 2, name: "项目B", description: "这是项目B的描述" },
        { id: 3, name: "项目C", description: "这是项目C的描述" },
      ];
      return projects;
    }
  };
};
