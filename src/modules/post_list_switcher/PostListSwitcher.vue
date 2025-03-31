<template>
  <div class="category-switcher">
    <h3 class="tools-section-title">Category</h3>
    <div class="s-categories-btns-wrapper">
      <router-link
          v-for="category in categories"
          :key="category.type"
          :to="category.path"
          class="s-category"
          :class="{
          'disabled': postsByCategoriesStore.getCategoryData(category.type).total === 0,
          'active': postsByCategoriesStore.currentCategory == category.type,
        }"
          @click.native.prevent="router.push(category.path)"
      >
        <div class="category-title-total">
          {{ category.name }}
          <div class="total-by-category">{{ postsByCategoriesStore.getCategoryData(category.type).total }}</div>
        </div>
        <img class="category-select-svg-limiter" src="/svg/arrow_right.svg" alt="arrow_right">
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {SearchCategories} from "@/modules/post_list_switcher/SearchCategories";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";
import {RoutesList} from "@/RoutesList";

const postsByCategoriesStore = usePostsByCategoryStore();
const router = useRouter();

const categories = computed(() => [
  {
    type: SearchCategories.Default,
    name: "All",
    path: RoutesList.Default
  },
  {
    type: SearchCategories.Id,
    name: "Id",
    path: RoutesList.Id
  },
  {
    type: SearchCategories.Content,
    name: "Content",
    path: RoutesList.Content
  },
  {
    type: SearchCategories.Title,
    name: "Title",
    path: RoutesList.Title
  },
  {
    type: SearchCategories.Tag,
    name: "Tag",
    path: RoutesList.Tag
  }
]);
</script>