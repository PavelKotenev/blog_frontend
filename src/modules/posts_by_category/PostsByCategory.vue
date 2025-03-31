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
import { computed, type ComputedRef, onMounted, ref, watch, nextTick } from 'vue';
import { CategoryData, usePostsByCategoryStore } from "@/modules/posts_by_category/postsByCategoryStore";
import Post from '@/modules/post/Post.vue';

const postsByCategoryStore = usePostsByCategoryStore();
const categoryData = computed(() => postsByCategoryStore.getCategoryData(postsByCategoryStore.currentCategory)) as ComputedRef<CategoryData>;

const anchor = ref<HTMLDivElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

const createObserver = () => {
  if (observer.value) {
    observer.value.disconnect();
  }

  if (anchor.value) {
    observer.value = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting && categoryData.value.total >= 20) {
        postsByCategoryStore.fetchPostsByCategory(postsByCategoryStore.currentCategory);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    observer.value.observe(anchor.value);
  }
};

onMounted(() => {
  setTimeout(createObserver, 300);
});

watch(categoryData, async () => {
  await nextTick();
  createObserver();
});

</script>