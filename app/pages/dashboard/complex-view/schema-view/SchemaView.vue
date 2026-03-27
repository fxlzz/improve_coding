<template>
  <el-row class="schema-container">
    <SerachPanel></SerachPanel>
    <TablePanel></TablePanel>
  </el-row>
</template>

<script setup>
import SerachPanel from "./serach-panel/SerachPanel.vue";
import TablePanel from "./table-panel/TablePanel.vue";
import { useSchema } from "./hook/schema.js";

const { api } = useSchema();

setTimeout(() => {
  console.log(api.value);
}, 1000);
</script>

<style lang="less" scoped>
.schema-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>