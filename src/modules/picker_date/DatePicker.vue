<template>
  <div class="date-picker-wrapper">
    <h3 class="tools-section-title">From</h3>
    <div class="date-picker-limiter">
      <VueDatePicker
          v-model="fromCreatedAt"
          position="center"
          auto-position="bottom"
          @update:model-value="datePickerStore.toggleFromCreatedAt($event)"
          model-type="timestamp"
          :dark="true"
          inline
          :min-date="minDate"
          :max-date="new Date()"
          :start-date="new Date()"
          :enable-time-picker="false"
          auto-apply
      >
      </VueDatePicker>
    </div>
    <div class="date-picker-result"
         @click="datePickerStore.dumpFromCreatedAt()"
    >
      <span v-if="datePickerStore.fromCreatedAt">
        {{ datePickerStore.formatEpochMs(datePickerStore.fromCreatedAt) }}
      </span>
      <span v-else>
      -
      </span>
    </div>
    <h3 class="tools-section-title">To</h3>
    <div class="date-picker-limiter">
      <VueDatePicker
          v-model="toCreatedAt"
          position="center"
          auto-position="bottom"
          @update:model-value="datePickerStore.toggleToCreatedAt($event)"
          model-type="timestamp"
          :dark="true"
          inline
          :min-date="minDate"
          :max-date="new Date()"
          :start-date="new Date()"
          :enable-time-picker="false"
          auto-apply
      >
      </VueDatePicker>
    </div>
    <div class="date-picker-result"
         @click="datePickerStore.dumpToCreatedAt()"
    >
      <span v-if="datePickerStore.toCreatedAt">
        {{ datePickerStore.formatEpochMs(datePickerStore.toCreatedAt) }}
      </span>
      <span v-else>
      -
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {ref} from "vue";
import {useDatePickerStore} from "@/modules/picker_date/datePickerStore";

const datePickerStore = useDatePickerStore();

const fromCreatedAt = ref<number | null>(null);
const toCreatedAt = ref<number | null>(null);

const minDate = new Date(2025, 1, 1);

</script>