<template>
  <div class="client">
    <div class="menu">
      <Search></Search>
      <PostListSwitcher></PostListSwitcher>
      <SelectedFilters></SelectedFilters>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Search from "@/modules/search/Search.vue";
import SelectedFilters from "@/modules/selected_filters/SelectedFilters.vue";
import PostListSwitcher from "@/modules/post_list_switcher/PostListSwitcher.vue";

export default defineComponent({
  components: {PostListSwitcher, SelectedFilters, Search}
});
</script>