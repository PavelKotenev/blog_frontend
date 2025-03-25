<template>
  <div class="header">
    <div class="h-units">
      <div class="s-input-and-svgs">
        <img class="h-svg-holder" src="/svg/search.svg" alt="filters">
        <input
            ref="inputRef"
            v-model="searchConditionsStore.searchTerm"
            type="text"
            class="s-input"
            autocomplete="off"
        />
        <div class="s-input-btn" @click.stop="toggleTools">
          <img v-if="!showTools" class="h-svg-holder" src="/svg/settings.svg" alt="filters">
          <img v-else class="h-svg-holder" src="/svg/remove_filter.svg" alt="remove-filter">
        </div>
      </div>
    </div>
      <transition name="dropdown-filters">
        <div v-if="showTools" class="h-dropdown">
          <div class="h-units">
            <div class="s-input-and-svgs">
              <img class="h-svg-holder" src="/svg/search.svg" alt="filters">
              <input
                  ref="inputRef"
                  v-model="searchConditionsStore.searchTerm"
                  type="text"
                  class="s-input"
                  autocomplete="off"
              />
              <div class="s-input-btn" @click.stop="toggleTools">
                <img v-if="!showTools" class="h-svg-holder" src="/svg/settings.svg" alt="filters">
                <img v-else class="h-svg-holder" src="/svg/remove_filter.svg" alt="remove-filter">
              </div>
            </div>
          </div>
          <PostListSwitcher></PostListSwitcher>
          <TagPicker></TagPicker>
          <DatePicker></DatePicker>
        </div>
      </transition>
    <PostListSwitcher></PostListSwitcher>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useSearchConditionsStore} from "@/modules/header/searchConditionsStore";
import DatePicker from "@/modules/picker_date/DatePicker.vue";
import TagPicker from "@/modules/picker_tag/TagPicker.vue";
import {debounce} from "lodash";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";
import PostListSwitcher from "@/modules/post_list_switcher/PostListSwitcher.vue";

const searchConditionsStore = useSearchConditionsStore();
const inputRef = ref<HTMLInputElement | null>(null);
const showTools = ref(false);
const postsByCategoryStore = usePostsByCategoryStore();

const toggleTools = () => {
  showTools.value = !showTools.value;
  console.log(showTools.value);
};

watch(
    () => searchConditionsStore.searchTerm,
    debounce(async () => {
      await postsByCategoryStore.actionAfterFiltration();
    }, 200)
);
</script>
