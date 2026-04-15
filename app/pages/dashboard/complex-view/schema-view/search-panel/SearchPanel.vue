<template>
  <el-card class="search-panel">
    <SchemaSearchBar
      :schema="searchSchema"
      @load="onLoad"
      @search="onSearch"
      @reset="onReset"
    />
  </el-card>
</template>

<script setup>
import { inject } from "vue";
const { searchSchema } = inject("schemaViewData");

import SchemaSearchBar from "@widgets/schema-search-bar/SchemaSearchBar.vue";

const emit = defineEmits(["search"]);

const onLoad = (searchObj) => {
  emit("search", searchObj);
};

const onSearch = (searchObj) => {
  emit("search", searchObj);
};

const onReset = () => {
  emit("search", {});
};
</script>

<style lang="less" scoped>
.search-panel {
  margin: 10px;
}

:deep(.el-card__body) {
  padding-bottom: 2px;
}
</style>