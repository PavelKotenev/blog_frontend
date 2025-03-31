<template>
  <div class="p-box" @click="toggleContent">
    <div class="p-title-created-at">
      <div class="p-title">{{ post.title }}</div>
      <div class="p-created-at">
        <div class="p-day">{{ formattedDate.day }}</div>
        <div class="p-month">{{ formattedDate.month }}</div>
        <div class="p-hours-minutes">{{ formattedDate.hourMinutes }}</div>
      </div>
    </div>
    <div class="p-content-and-btn">
      <div class="p-content" :class="{ 'expanded': isExpanded }">
        {{ post.content }}
      </div>
    </div>
    <div class="p-attributes">
      <div class="p-tags">
        <div v-for="tag in post.tags" :key="tag.id" :tag="tag">
          <div class="p-tag-btn" @click="tagsPickerStore.toggleTag(tag.id)">#{{ tag.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTagPickerStore } from "@/modules/picker_tag/tagPickerStore";
import { PostByCategory } from "@/modules/posts_by_category/PostsByCategoryResponse";
import { FormatedDate } from "@/modules/picker_date/FormatedDate";

const props = defineProps<{ post: PostByCategory }>();

const tagsPickerStore = useTagPickerStore();

const isExpanded = ref(false);

const toggleContent = () => {
  isExpanded.value = !isExpanded.value;
};

const formattedDate = computed(() => new FormatedDate(props.post.createdAt));
</script>