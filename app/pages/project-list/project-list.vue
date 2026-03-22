<template>
  <HeaderContainer title="项目列表">
    <template #main-content>
      <div v-loading="loading">
        <div v-for="item in modelList" :key="item.model?.key">
          <!-- 展示 model -->
          <div class="model-panel">
            <el-row type="flex" align="middle">
              <div class="title">{{ item.model?.name }}</div>
            </el-row>
            <div class="divider"></div>
          </div>

          <!-- 展示project -->
          <el-row type="flex" class="project-list">
            <el-card
              v-for="projItem in item.project"
              :key="projItem.key"
              class="project-card"
            >
              <template #header>
                <div class="title">
                  <span>{{ projItem.name }}</span>
                </div>
              </template>

              <div class="content">
                {{ projItem.desc ?? "---" }}
              </div>

              <template #footer>
                <el-row type="flex" justify="end">
                  <el-button link type="primary" @click="onEnter(projItem)"
                    >进入系统</el-button
                  >
                </el-row>
              </template>
            </el-card>
          </el-row>
        </div>
      </div>
    </template>
  </HeaderContainer>
</template>

<script setup>
import HeaderContainer from "../widgets/header-container/HeaderContainer.vue";
import { ref, onMounted } from "vue";
import { fetchModelList } from "./apis/model";

const loading = ref(false);
const modelList = ref([]);

const getModelList = async () => {
  loading.value = true;
  const res = await fetchModelList();
  loading.value = false;
  modelList.value = res.data;
};

onMounted(() => {
  getModelList();
});

const onEnter = (project) => {
  console.log(`进入${project.name}`);
};
</script>

<style lang="less" scoped>
.model-panel {
  margin: 20px 50px;
  min-width: 500px;

  .title {
    font-size: 25px;
    font-weight: bold;
    color: #6c6c6c;
  }

  .divider {
    margin-top: 10px;
    border-bottom: 1px dashed #d7d7d7;
    width: 200px;
  }
}

.project-list {
  margin: 0 50px;

  .project-card {
    margin-right: 30px;
    margin-bottom: 20px;
    width: 300px;

    .title {
      font-weight: hold;
      font-size: 17px;
      color: #47a2ff;
    }

    .content {
      height: 70px;
      color: darkgrey;
      font-size: 15px;
      overflow: auto;
    }
  }
}
</style>