<template>
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
          <TagsPicker></TagsPicker>
        </div>
        <div class="tools-section">
          <h3 class="tools-section-title">Datepicker</h3>
          <DatePicker></DatePicker>
        </div>
        <button class="tools-hide-btn" @click.stop="toggleTools">Hide</button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from "vue";
import {useCommonCategoriesStore} from "@/modules/post_list_switcher/commonCategoriesStore";
import {useSearchConditionsStore} from "@/modules/search/searchConditionsStore";
import DatePicker from "@/modules/picker_date/DatePicker.vue";
import TagPicker from "@/modules/picker_tag/TagPicker.vue";
import {debounce} from "lodash";
import {usePostsByCategoryStore} from "@/modules/posts_by_category/postsByCategoryStore";

export default defineComponent({
  components: {
    TagsPicker: TagPicker,
    DatePicker
  },
  setup() {
    const searchConditionsStore = useSearchConditionsStore();
    const inputRef = ref<HTMLInputElement | null>(null);
    const showTools = ref(false);
    const commonCategoriesStore = useCommonCategoriesStore();
    const postsByCategoryStore = usePostsByCategoryStore();

    const toggleTools = () => {
      showTools.value = !showTools.value;
    };
    watch(
        () => searchConditionsStore.searchTerm,
        debounce(async () => {
          await postsByCategoryStore.fetchPostsByActiveRoute();
          await commonCategoriesStore.getPostsAccountByCategory();
        }, 200)
    );
    return {
      searchConditionsStore,
      inputRef,
      showTools,
      toggleTools,
    };
  },
});
</script>
