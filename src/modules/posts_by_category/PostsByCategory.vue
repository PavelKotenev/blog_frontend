<template>
  <div ref="scrollContainer" class="p-list-box">
    <Post v-for="post in categoryData.posts"
          :key="post.id"
          :post="post"
    />
    <div ref="anchor" class="anchor"></div>
  </div>
</template>

<script setup lang="ts">
import {computed, type ComputedRef, onMounted, ref} from 'vue';
import {CategoryData, usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";
import Post from '@/modules/post/Post.vue';

const postsByCategoryStore = usePostsByCategoryStore();

const categoryData = computed(() => postsByCategoryStore.getCategoryData(postsByCategoryStore.currentCategory)) as ComputedRef<CategoryData>;

const anchor = ref<HTMLDivElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const onAnchorIntersect = (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  if (entry.isIntersecting && categoryData.value.total >= 20) {
    postsByCategoryStore.fetchPostsByCategory();
  }
};

onMounted(async () => {
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