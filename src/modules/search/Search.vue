<template>
  <div class="s-and-contacts">
    <div class="s-input-box">
      <div class="s-search-svg">
        <img class="s-svg-holder" src="/svg/search.svg" alt="post-stub">
      </div>
      <input
          ref="inputRef"
          v-model="searchConditionsStore.searchTerm"
          type="text"
          class="s-input"
          autocomplete="off"
          placeholder="Search..."
      />
      <div class="s-input-btn" @click.stop="toggleTools">
        <img class="s-svg-holder" src="/svg/filters.svg" alt="post-stub">
      </div>

      <transition name="filters-slide">
        <div v-if="showTools" class="tools-dropdown">
          <div class="tools-section">
            <h3 class="tools-section-title">Tagpicker</h3>
            <TagPicker></TagPicker>
          </div>
          <div class="tools-section">
            <h3 class="tools-section-title">Datepicker</h3>
            <DatePicker></DatePicker>
          </div>
          <button class="tools-hide-btn" @click.stop="toggleTools">Hide</button>
        </div>
      </transition>
    </div>
    <a class="s-input-btn-contacts" href="https://github.com/PavelKotenev/blog_backend" target="_blank"
       rel="noopener noreferrer">
      <img class="s-svg-holder" src="/svg/github.svg" alt="GitHub">
    </a>
    <a class="s-input-btn-contacts" href="https://t.me/SamDev030" target="_blank" rel="noopener noreferrer">
      <img class="s-svg-holder" src="/svg/telegram.svg" alt="Telegram">
    </a>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useSearchConditionsStore} from "@/modules/search/searchConditionsStore";
import DatePicker from "@/modules/picker_date/DatePicker.vue";
import TagPicker from "@/modules/picker_tag/TagPicker.vue";
import {debounce} from "lodash";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

const searchConditionsStore = useSearchConditionsStore();
const inputRef = ref<HTMLInputElement | null>(null);
const showTools = ref(false);
const postsByCategoryStore = usePostsByCategoryStore();

const toggleTools = () => {
  showTools.value = !showTools.value;
};

watch(
    () => searchConditionsStore.searchTerm,
    debounce(async () => {
      await postsByCategoryStore.actionAfterFiltration();
    }, 200)
);
</script>
