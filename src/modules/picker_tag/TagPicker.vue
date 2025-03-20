<template>
  <div class="tags-picker-wrapper">
    <div class="tags-picker">
      <div class="tags-block">
        <div v-for="tag in tagsPickerStore.selectedTagsToShow" :key="tag.id" class="p-tag-item">
          <div class="p-tag-btn selected" @click="tagsPickerStore.toggleTag(tag.id)">
            {{ tag.title }}
          </div>
        </div>
        <div v-for="tag in tagsPickerStore.suggestedTagsToShow" :key="tag.id" class="p-tag-item">
          <div class="p-tag-btn" @click="tagsPickerStore.toggleTag(tag.id)">
            {{ tag.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagPickerStore } from "@/modules/picker_tag/tagPickerStore";
import { onMounted } from "vue";

const tagsPickerStore = useTagPickerStore();

onMounted(async () => {
  await tagsPickerStore.getTagsForPicker();
});
</script>