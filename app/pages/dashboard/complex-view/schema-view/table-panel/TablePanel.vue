<template>
  <el-card class="table-panel">
    <SchemaTable></SchemaTable>
  </el-card>
</template>

<script setup>
import SchemaTable from "@widgets/schema-table/SchemaTable.vue";
</script>

<style lang="less" scoped>
.table-panel {
  flex: 1;
  margin: 10px;
}
</style>