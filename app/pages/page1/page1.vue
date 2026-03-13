<template>
  <h1 style="color: red">hello page1</h1>
  <el-input
    v-model="value"
    style="width: 240px"
    placeholder="Please input"
    clearable
  />
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="项目名" />
    <el-table-column prop="description" label="描述" />
  </el-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import curl from "@common/curl";

const value = ref("");
const tableData = ref([]);

const getTableData = async () => {
  const res = await curl({
    url: "/api/projects",
    method: "get",
    query: {
      proj_key: "1234567890",
    },
    errorMessage: "获取表格数据异常",
  });

  tableData.value = res.data;
};

onMounted(() => {
  getTableData();
});
</script>

<style lang="less" scoped>
</style>