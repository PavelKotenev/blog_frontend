<template>
  <div class="date-picker-wrapper">
    <div class="date-picker-limiter">
      <VueDatePicker
          v-model="dateRange"
          :range="rangeConfig"
          position="center"
          auto-position="bottom"
          @update:model-value="datePickerStore.handleDate"
          :multi-calendars="false"
          :dark="true"
          :inline="inlineConfig"
          :min-date="minDate"
          :max-date="new Date()"
          :start-date="new Date()"
          :enable-time-picker="false"
          :prevent-min-max-navigation="true"
          :hide-action-buttons="true"
          :auto-apply="true"
      >
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {ref} from "vue";
import { useDatePickerStore} from "@/modules/picker_date/datePickerStore";

const datePickerStore = useDatePickerStore();

const dateRange = ref<[Date | null, Date | null]>([new Date(), null]);

interface RangeConfig {
  partialRange?: boolean;
  minRange?: string | number;
}

interface InlineOptions {
  disableInput?: boolean;
}

const minDate = new Date(2025, 1, 1);

const rangeConfig: RangeConfig = {
  partialRange: true,
};
const inlineConfig: InlineOptions = {
  disableInput: true,
};

</script>