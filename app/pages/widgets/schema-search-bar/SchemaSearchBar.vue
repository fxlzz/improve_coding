<template>
  <el-form
    v-if="schema && schema.properties"
    :inline="true"
    class="schema-search-bar"
  >
    <el-form-item
      v-for="(schemaItem, key) in schema.properties"
      :key="key"
      :label="schemaItem.label"
    >
      <!-- 动态组件 -->
      <component
        :ref="handleSearchComList"
        :is="SearchItemConfig[schemaItem.option?.comType]?.component"
        :schema-key="key"
        :schema="schemaItem"
        @loaded="handleChildLoaded"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain class="search-btn" @click="search">
        搜索
      </el-button>
      <el-button plain class="reset-btn" @click="reset"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, toRefs } from "vue";
import SearchItemConfig from "./SearchItemConfig.js";

const props = defineProps({ schema: Object });
const { schema } = toRefs(props);

const emits = defineEmits(["load", "search", "reset"]);

const searchComList = ref([]);
const handleSearchComList = (el) => {
  if (!el) return;
  if (!searchComList.value.includes(el)) {
    searchComList.value.push(el);
  }
};

const getValue = () => {
  let dtoObj = {};
  searchComList.value.forEach((component) => {
    dtoObj = {
      ...dtoObj,
      ...component?.getValue(),
    };
  });
  return dtoObj;
};

let childComLoadedCount = 0;
const handleChildLoaded = () => {
  childComLoadedCount++;
  if (
    childComLoadedCount >= Object.keys(schema?.value?.properties ?? {}).length
  ) {
    emits("load", getValue());
  }
};

const search = () => {
  emits("search", getValue());
};

const reset = () => {
  searchComList.value.forEach((component) => component?.reset());
  emits("reset");
};

defineExpose({
  reset,
});
</script>

<style lang="less">
.schema-search-bar {
  min-width: 500px;

  .input {
    width: 180px;
  }

  .select {
    width: 180px;
  }

  .dynamic-select {
    width: 180px;
  }

  .search-btn {
    width: 100px;
  }

  .reset-btn {
    width: 100px;
  }
}
</style>