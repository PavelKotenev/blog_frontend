<template>
  <div class="filter-conditions">
    <div class="condition-box" v-if="datePickerStore.fromCreatedAt || datePickerStore.toCreatedAt">
      <div class="condition-item"
           v-if="datePickerStore.fromCreatedAt"
           @click="datePickerStore.dumpFromCreatedAt()"
      >
        FROM {{ datePickerStore.formatEpochMs(datePickerStore.fromCreatedAt) }}
      </div>
      <div class="condition-item"
           v-if="datePickerStore.toCreatedAt"
           @click="datePickerStore.dumpToCreatedAt()"
      >
        TO {{ datePickerStore.formatEpochMs(datePickerStore.toCreatedAt) }}
      </div>
    </div>
    <div v-if="tagPickerStore.selectedTagsIds.length > 0" class="condition-box">
      <div v-for="tag in tagPickerStore.selectedTags"
           :key="tag.id"
           class="condition-item"
           @click="tagPickerStore.toggleTag(tag.id)">
        {{ tag.title }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useDatePickerStore} from "@/modules/picker_date/datePickerStore";
import {useTagPickerStore} from "@/modules/picker_tag/tagPickerStore";

const tagPickerStore = useTagPickerStore();
const datePickerStore = useDatePickerStore();
</script>