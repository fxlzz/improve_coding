<template>
  <div class="schema-table">
    <el-table
      v-if="schema && schema.properties"
      v-loading="loading"
      :data="tableData"
      class="table"
    >
      <template v-for="(schemaItem, key) in schema?.properties">
        <el-table-column
          v-if="schemaItem.option.visiable !== false"
          :key="key"
          :prop="key"
          :label="schemaItem.label"
          v-bind="schemaItem.option"
        />
      </template>
      <el-table-column
        v-if="buttons?.length > 0"
        label="操作"
        fixed="right"
        :width="operationWdith"
      >
        <template #default="scope">
          <el-button
            v-for="item in buttons"
            :key="item.label"
            link
            v-bind="item"
            @click="operationHandler({ btnConfig: item, rowData: scope.row })"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else description="无数据" />
    <el-row class="pagination">
      <el-pagination
        :current-page="pageParams.currentPage"
        :page-size="pageParams.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="pageParams.total"
        layout="total, prev, pager, next, sizes, jumper"
        @size-change="onPageSizeChange"
        @current-change="onCurrentPageChange"
      />
    </el-row>
  </div>
</template>

<script setup>
const props = defineProps({
  api: String,
  apiParams: Object,
  schema: Object,
  buttons: Array,
});

import {
  ref,
  toRefs,
  onMounted,
  watch,
  nextTick,
  reactive,
  computed,
} from "vue";
import curl from "@common/curl.js";

const { api, schema, buttons, apiParams } = toRefs(props);

const emit = defineEmits(["operate"]);

const tableData = ref([]);
const loading = ref(false);
const pageParams = reactive({
  currentPage: 1,
  pageSize: 20,
  total: 0,
});

onMounted(() => {
  initData();
});

watch([schema, api, apiParams], () => {
  initData();
});

const operationWdith = computed(() => {
  return buttons.value?.length > 0
    ? buttons.value.reduce((pre, cur) => {
        return pre + cur?.label.length * 18;
      }, 50)
    : 50;
});

const operationHandler = ({ btnConfig, rowData }) => {
  emit("operate", { btnConfig, rowData });
};

// 初始化数据
const initData = () => {
  tableData.value = [];
  pageParams.currentPage = 1;
  pageParams.pageSize = 20;

  // 更新数据
  nextTick(async () => {
    await loadTableData();
  });
};

// 节流函数，防止因为依赖变化，导致的多次接口请求
let timer = null;
const loadTableData = async () => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    await fetchData();
    timer = null;
  }, 100);
};

const fetchData = async () => {
  if (!api.value) return [];

  showLoading();

  const res = await curl({
    method: "get",
    url: `${api.value}/list`,
    query: {
      ...apiParams.value,
      page: pageParams.currentPage,
      size: pageParams.pageSize,
    },
  });

  hiddenLoading();

  if (!res || !res.sucess || !res.data) {
    // 接口错误 -- curl 会拦截 -- 这里兜底页面渲染没问题
    tableData.value = [];
    pageParams.total = 0;
  }

  // 数据处理
  tableData.value = buildTableData(res.data);
  pageParams.total = res.metadata.total;
};

const buildTableData = (tableData) => {
  if (!schema.value?.properties) {
    return tableData;
  }
  return tableData?.map((rowData) => {
    for (const dKey in rowData) {
      const schemaItem = schema.value.properties[dKey];
      if (schemaItem?.option?.toFixed) {
        rowData[dKey] =
          rowData[dKey].toFixed &&
          rowData[dKey].toFixed(schemaItem.option.toFixed);
      }
    }
    return rowData;
  });
};

const showLoading = () => {
  loading.value = true;
};

const hiddenLoading = () => {
  loading.value = false;
};

const onPageSizeChange = async (value) => {
  pageParams.pageSize = value;
  await loadTableData();
};

const onCurrentPageChange = async (value) => {
  pageParams.currentPage = value;
  await loadTableData();
};

defineExpose({
  initData,
  loadTableData,
  showLoading,
  hiddenLoading,
});
</script>

<style lang="less" scoped>
.schema-table {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;

  .table {
    flex: 1;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
    text-align: right;
  }
}
</style>