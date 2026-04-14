<template>
  <el-card class="table-panel">
    <el-row
      v-if="headerButtons.length > 0"
      justify="end"
      class="operation-panel"
    >
      <el-button
        v-for="item in headerButtons"
        v-bind="item"
        @click="operationHandler({ btnConfig: item })"
        >{{ item.label }}
      </el-button>
    </el-row>
    <SchemaTable
      ref="schemaTableRef"
      :schema="tableSchema"
      :api="api"
      :buttons="rowButtons"
      @operate="operationHandler"
    />
  </el-card>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { ElMessageBox, ElNotification } from "element-plus";
import curl from "@common/curl.js";
import SchemaTable from "@widgets/schema-table/SchemaTable.vue";

const { api, tableSchema, tableConfig } = inject("schemaViewData");

const headerButtons = computed(() => tableConfig.value?.headerButtons || []);
const rowButtons = computed(() => tableConfig.value?.rowButtons || []);

const schemaTableRef = ref(null);
const emit = defineEmits(["operate"]);

const eventHandlerMap = {
  remove: removeData,
};

// 分发操作
const operationHandler = ({ btnConfig, rowData }) => {
  const { eventKey } = btnConfig;
  if (eventHandlerMap[eventKey]) {
    eventHandlerMap[eventKey]({ btnConfig, rowData });
  } else {
    emit("operate", { btnConfig, rowData });
  }
};

async function removeData({ btnConfig, rowData }) {
  const { eventOption } = btnConfig;
  if (!eventOption?.params) return;

  const { params } = eventOption;
  const removeKey = Object.keys(params)[0];
  const removeValueStr = params[removeKey];

  const removeValueList = removeValueStr.split("::");
  let removeValue;
  if (removeValueList[0] === "schema" && removeValueList[1]) {
    removeValue = rowData[removeValueList[1]];
  }

  ElMessageBox.confirm(
    `确认删除 ${removeKey} 为：${removeValue} 数据？`,
    "Warning",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(async () => {
    schemaTableRef.value.showLoading();
    const res = await curl({
      method: "delete",
      url: api.value,
      body: {
        [removeKey]: removeValue,
      },
      errorMessage: "删除失败",
    });
    schemaTableRef.value.hiddenLoading();

    if (!res || !res.success || !res.data) {
      return;
    }

    ElNotification({
      title: "删除成功",
      message: "删除成功",
      type: "success",
    });

    await schemaTableRef.value.loadTableData();
  });

  await curl({
    method: "delete",
    url: api.value,
    data: {
      [removeKey]: removeValue,
    },
  });
}
</script>

<style lang="less" scoped>
.table-panel {
  flex: 1;
  margin: 10px;
  .operation-panel {
    margin-bottom: 10px;
  }
}

:deep(.el-card__body) {
  height: 98%;
  display: flex;
  flex-direction: column;
}
</style>