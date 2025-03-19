<template>
  <div ref="scrollContainer" class="p-list-box">
    <Post v-for="post in categoryData.posts"
          :key="post.id"
          :post="post"/>
    <div ref="anchor" class="anchor"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType, computed, type ComputedRef } from 'vue';
import { usePostsByCategoryStore } from "@/modules/posts_by_category/postsByCategoryStore";
import Post from '@/modules/post/Post.vue';
import { SearchCategories } from "@/modules/post_list_switcher/SearchCategories";
import { CategoryData } from "@/modules/posts_by_category/postsByCategoryStore";

const props = defineProps({
  category: {
    type: String as PropType<SearchCategories>,
    required: true
  }
});

const postsByCategoryStore = usePostsByCategoryStore();

const categoryData = computed(() => postsByCategoryStore.getCategoryData(props.category)) as ComputedRef<CategoryData>;

const anchor = ref<HTMLDivElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const onAnchorIntersect = (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  if (entry.isIntersecting && categoryData.value.total > 0) {
    postsByCategoryStore.fetchPostsByCategory(props.category);
  }
};

onMounted(() => {
  postsByCategoryStore.fetchPostsByCategory(props.category);

  setTimeout(() => {
    if (anchor.value) {
      observer.value = new IntersectionObserver(onAnchorIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      });
      observer.value.observe(anchor.value);
    }
  }, 1000);
});
</script>

<style scoped>
.anchor {
  height: 1px;
}

.p-list-box {
  overflow-y: auto;
}
</style>