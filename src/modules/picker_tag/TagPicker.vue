<template>
  <div class="tags-picker">
    <h3 class="tools-section-title">Tags</h3>
    <div class="tp-tags-block">
      <div v-for="tag in tagsPickerStore.selectedTagsToShow" :key="tag.id" class="tp-tag-item">
        <div class="tp-tag-btn selected" @click="tagsPickerStore.toggleTag(tag.id)">
          {{ tag.title }}
        </div>
      </div>
      <div v-for="tag in tagsPickerStore.suggestedTagsToShow" :key="tag.id" class="tp-tag-item">
        <div class="tp-tag-btn" @click="tagsPickerStore.toggleTag(tag.id)">
          {{ tag.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTagPickerStore} from "@/modules/picker_tag/tagPickerStore";
import {onMounted} from "vue";

const tagsPickerStore = useTagPickerStore();

onMounted(async () => {
  await tagsPickerStore.getTagsForPicker();
});
</script>