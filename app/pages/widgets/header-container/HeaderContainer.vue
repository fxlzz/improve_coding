<template>
  <el-container class="header-container">
    <el-header class="header">
      <el-row type="flex" align="middle" class="header-row">
        <!-- logo 区域 -->
        <el-row type="flex" align="middle" class="title-panel">
          <img src="./assets/logo.jpg" class="logo" />
          <el-row class="text">{{ title }}</el-row>
        </el-row>

        <!-- 顶部菜单区域 -->
        <el-row>
          <slot name="menu-content"></slot>
        </el-row>

        <!-- 用户信息区域 -->
        <el-row type="flex" align="middle" justify="end" class="setting-panel">
          <!-- 插槽：设置区域 -->
          <slot name="setting-content"></slot>
          <img src="./assets/logo.jpg" class="avatar" />
          <el-dropdown @command="handleUserCommand">
            <span class="username">
              {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </template>
          </el-dropdown>
        </el-row>
      </el-row>
    </el-header>

    <el-main class="main-container">
      <slot name="main-content"></slot>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  title: String,
});

const userName = ref("admin");
const handleUserCommand = (e) => {
  console.log(e);
};
</script>

<style lang="less" scoped>
.header-container {
  height: 100%;
  min-width: 1000px;
  overflow: hidden;

  .header {
    max-height: 120px;
    border-bottom: 1px solid #ebebeb;

    .header-row {
      height: 60px;
      padding: 0 20px;

      .title-panel {
        width: 200px;
        height: 100%;
        .logo {
          margin-right: 10px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

        .text {
          font-size: 15px;
          font-weight: 500;
        }
      }

      .setting-panel {
        margin-left: auto;
        min-width: 100px;

        .avatar {
          margin-right: 12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .username {
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          height: 60px;
          line-height: 60px;
          outline: none;
        }
      }
    }
  }
  .main-container {
  }

  :deep(.el-header) {
    padding: 0;
  }
}
</style>