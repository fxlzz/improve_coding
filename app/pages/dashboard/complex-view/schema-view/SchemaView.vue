<template>
  <el-row class="schema-container">
    <SearchPanel @search="onSearch" />
    <TablePanel @operate="onTableOperate" />
  </el-row>
</template>

<script setup>
import SearchPanel from "./search-panel/SearchPanel.vue";
import TablePanel from "./table-panel/TablePanel.vue";
import { useSchema } from "./hook/schema.js";
import { provide, ref } from "vue";

let apiParams = ref({});
const { api, tableSchema, tableConfig, searchConfig, searchSchema } =
  useSchema();

provide("schemaViewData", {
  api,
  apiParams,
  tableSchema,
  tableConfig,
  searchSchema,
  searchConfig,
});

const onSearch = (searchObj) => {
  apiParams.value = searchObj;
};

const onTableOperate = () => {};
</script>

<style lang="less" scoped>
.schema-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>