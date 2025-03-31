<template>
  <div class="client">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Header from "@/modules/header/Header.vue";

export default defineComponent({
  components: {Header}
});
</script>