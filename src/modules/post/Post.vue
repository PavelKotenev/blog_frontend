<template>
  <div class="p-box">
    <div class="p-title-created-at">
      <div class="p-title">{{ post.title }}</div>
      <div class="p-created-at">
        <div class="p-day">{{ formattedDate.day }}</div>
        <div class="p-month">{{ formattedDate.month }}</div>
        <div class="p-hours-minutes">{{ formattedDate.hourMinutes }}</div>
      </div>
    </div>
    <div class="p-content-and-btn">
      <div ref="contentRef" class="p-content" :class="{ 'expanded': isExpanded }">
        {{ post.content }}
      </div>
      <button
          v-if="isContentLong"
          class="p-read-hide-btn"
          @click="toggleContent"
      >
        <img v-if="!isExpanded" class="p-read-hide-btn-svg-limiter" src="/svg/show_content.svg" alt="filters">
        <img v-else class="p-read-hide-btn-svg-limiter" src="/svg/hide_content.svg" alt="remove-filter">
      </button>
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
import {ref, computed, onMounted, nextTick} from "vue";
import {useTagPickerStore} from "@/modules/picker_tag/tagPickerStore";
import {PostByCategory} from "@/modules/posts_by_category/PostsByCategoryResponse";
import {FormatedDate} from "@/modules/picker_date/FormatedDate";

const props = defineProps<{ post: PostByCategory }>();

const tagsPickerStore = useTagPickerStore();

const isExpanded = ref(false);
const contentRef = ref<HTMLElement | null>(null);
const isContentLong = ref(false);

const toggleContent = () => {
  isExpanded.value = !isExpanded.value;
};

const checkContentHeight = () => {
  if (contentRef.value) {
    const lineHeight = 24;
    const maxHeight = lineHeight * 3;
    const actualHeight = contentRef.value.scrollHeight;
    isContentLong.value = actualHeight > maxHeight;
  }
};

onMounted(() => {
  nextTick(() => {
    checkContentHeight();
  });
});

const formattedDate = computed(() => new FormatedDate(props.post.createdAt));
</script>