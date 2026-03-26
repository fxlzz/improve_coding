<template>
  <el-container class="sider-container">
    <el-sider class="asider">
      <slot name="menu-content"></slot>
    </el-sider>
    <el-main>
      <slot name="main-content"></slot>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<style lang="less" scoped>
.sider-container {
  height: 100%;

  .asider {
    border-right: 1px solid #e8e8e8;
    width: 160px;
  }

  .main {
    overflow: scroll;
  }
}

:deep(.el-main) {
  padding: 0;
}

:deep(.el-menu) {
  border-right: 0;
}
</style>