import Input from "./complex-view/input/Input.vue";
import Select from "./complex-view/select/Select.vue";
import DynamicSelect from "./complex-view/dynamic-select/DynamicSelect.vue";
import DateRange from "./complex-view/date-range/DateRange.vue";

const SearchItemConfig = {
  input: {
    component: Input,
  },
  select: {
    component: Select,
  },
  dynamicSelect: {
    component: DynamicSelect,
  },
  dateRange: {
    component: DateRange,
  },
};

export default SearchItemConfig;
