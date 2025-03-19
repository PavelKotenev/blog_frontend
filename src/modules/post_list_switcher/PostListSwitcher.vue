<template>
  <div class="s-categories-btns-wrapper">
    <router-link
        v-for="category in categories"
        :key="category.type"
        :to="category.total === 0 && category.type !== SearchCategories.All ? '' : category.path"
        class="s-category-btn"
        :class="{ 'disabled': category.total === 0 }"
        @click.native.prevent="handleClick(category)"
    >
      <span class="s-category-btn-text">{{ category.label }}</span>
      <span class="s-category-btn-id" v-if="category.total > 0">{{ category.total }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

const postsByCategoriesStore = usePostsByCategoryStore();

const router = useRouter();

const categories = computed(() => [
  {
    type: SearchCategories.Default,
    label: "All",
    total: postsByCategoriesStore.getCategoryData(SearchCategories.Default).total,
    path: "/posts/all"
  },
  {
    type: SearchCategories.Id,
    label: "Ids",
    total: postsByCategoriesStore.getCategoryData(SearchCategories.Id).total,
    path: "/posts/by_ids"
  },
  {
    type: SearchCategories.Content,
    label: "Contents",
    total: postsByCategoriesStore.getCategoryData(SearchCategories.Content).total,
    path: "/posts/by_contents"
  },
  {
    type: SearchCategories.Title,
    label: "Titles",
    total: postsByCategoriesStore.getCategoryData(SearchCategories.Title).total,
    path: "/posts/by_titles"
  },
  {
    type: SearchCategories.Tag,
    label: "Tags",
    total: postsByCategoriesStore.getCategoryData(SearchCategories.Tag).total,
    path: "/posts/by_tags"
  }
]);

const handleClick = (category: { total: number; type: SearchCategories; path: string }) => {
  if (category.total > 0) {
    router.push(category.path);
  }
};
</script>