<template>
  <div class="header">
    <div class="h-units">
      <div class="s-input-and-svgs">
        <img class="h-svg-holder" src="/svg/search.svg" alt="filters">
        <input
            @click="dropdownStore.toggleDropdown(true)"
            ref="inputRef"
            placeholder="Search"
            v-model="searchConditionsStore.searchTerm"
            type="text"
            class="s-input"
            autocomplete="off"
        />
        <button @click="dropdownStore.toggleDropdown(!dropdownStore.showSearchDropdown)"
                class="h-filters-btn"
                v-show="true">
          {{ dropdownStore.showSearchDropdown ? 'Hide' : 'Filters' }}
        </button>

      </div>
      <div class="h-contacts">
        <a class="f-btn-contact"
           href="https://github.com/PavelKotenev/blog_backend"
           target="_blank"
           rel="noopener noreferrer"
        >
          <img class="h-svg-holder" src="/svg/github.svg" alt="filters">
        </a>
        <a class="f-btn-contact"
           href="https://t.me/SamDev030"
           target="_blank"
           rel="noopener noreferrer"
        >
          <img class="h-svg-holder" src="/svg/telegram.svg" alt="filters">
        </a>
      </div>
    </div>
    <transition name="dropdown-filters">
      <div v-if="dropdownStore.showSearchDropdown" class="h-dropdown">
        <PostListSwitcher></PostListSwitcher>
        <TagPicker></TagPicker>
        <DatePicker></DatePicker>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {watch} from "vue";
import {useSearchConditionsStore} from "@/modules/header/searchConditionsStore";
import {debounce} from "lodash";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";
import {useDropdownStore} from "@/modules/header/dropdownsStore";
import TagPicker from "@/modules/picker_tag/TagPicker.vue";
import DatePicker from "@/modules/picker_date/DatePicker.vue";
import PostListSwitcher from "@/modules/post_list_switcher/PostListSwitcher.vue";

const searchConditionsStore = useSearchConditionsStore();
const postsByCategoryStore = usePostsByCategoryStore();
const dropdownStore = useDropdownStore();

watch(
    () => searchConditionsStore.searchTerm,
    debounce(async () => {
      await postsByCategoryStore.actionAfterFiltration(true);
    }, 200)
);
</script>
